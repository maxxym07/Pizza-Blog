import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/shared/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from 'src/app/shared/interfaces/product.interfaces';
import { OrderService } from 'src/app/shared/services/order.service';
import { AngularFirestore } from '@angular/fire/firestore';

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
    private orderService: OrderService,
    private afStorage: AngularFirestore) { }

  ngOnInit(): void {
    this.getMyProduct();
  }

  // getMyProduct(): void{
  //   const id = +this.actRoute.snapshot.paramMap.get('id');
  //   this.prodService.getOneProduct(id).subscribe(data => {
  //     this.product = data;
  //     this.category = this.product?.category.nameEN;
  //   });
  // }
  
  getMyProduct(): void {
    const nameProduct = this.actRoute.snapshot.paramMap.get('name');
    this.afStorage.collection('products').ref.where('nameEN', '==', nameProduct).onSnapshot(
      collection => {
        collection.forEach(document => {
          const data = document.data() as IProduct;
          const id = document.id;
          this.product = ({ id, ...data })
        });
      }
    )
  }

  productCount(product: IProduct, status: boolean): void{
    this.prodService.productCountService(product,status)
}

addBasket(product: IProduct): void {
  this.orderService.addBasketService(product)
  product.count = 1;
}
  
}
