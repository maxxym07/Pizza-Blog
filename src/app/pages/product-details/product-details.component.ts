import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/shared/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from 'src/app/shared/interfaces/product.interfaces';
import { OrderService } from 'src/app/shared/services/order.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  product: IProduct;
  category = 'pizza';
  constructor(private prodService: ProductService,
    private actRoute: ActivatedRoute,
    private orderService: OrderService,) { }

  ngOnInit(): void {
    this.getMyProduct();
  }

  getMyProduct(): void{
    const id = +this.actRoute.snapshot.paramMap.get('id');
    this.prodService.getOneProduct(id).subscribe(data => {
      this.product = data;
      this.category = this.product?.category.nameEN;
    });
  }

  productCount(product: IProduct, status: boolean): void{
    this.prodService.productCountService(product,status)
}

addBasket(product: IProduct): void {
  this.orderService.addBasketService(product)
}
  
}
