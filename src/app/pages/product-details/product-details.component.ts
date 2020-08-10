import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/shared/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from 'src/app/shared/interfaces/product.interfaces';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  product: IProduct;
  category = 'pizza';
  constructor(private prodService: ProductService,
              private actRoute:ActivatedRoute) { }

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
}
