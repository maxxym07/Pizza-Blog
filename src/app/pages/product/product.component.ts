import { Component, OnInit, Input } from '@angular/core';
import { IProduct } from 'src/app/shared/interfaces/product.interfaces';
import { ProductService } from 'src/app/shared/services/product.service';
import { OrderService } from 'src/app/shared/services/order.service';
import { ActivatedRoute, Router,Event, NavigationEnd } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  @Input() homeCategory: string;

  products: Array<IProduct> = [];
  category: string;
  
  constructor(private prodService: ProductService,
    private actRoute: ActivatedRoute,
    private orderService: OrderService,
    private router: Router,
    private firecloud: AngularFirestore) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        const categoryName = this.actRoute.snapshot.paramMap.get('category');
        this.getProducts(categoryName);
      }
    })
 }

  ngOnInit(): void {
    if (this.homeCategory == 'pizza') {
      this.getProducts(this.homeCategory)
    }

  }

    // private getProducts(categoryName:string): void {
    // this.prodService.getCategoryProduct(categoryName).subscribe(data => {
    //   this.products = data;
    //   this.category = this.products[0]?.category.nameUA;
    // });
    // }
  
  private getProducts(categoryName: string): void {
    this.products = [];
      this.firecloud.collection('products').ref.where('category.nameEN', '==', categoryName).
        onSnapshot(
          collection => {
            collection.forEach(document => {
              const data = document.data() as IProduct
              const id = document.id;
              this.products.push({ id, ...data });
            });
            this.category = this.products[0]?.category.nameUA;
          }
        );
      }
  
  
  productCount(product: IProduct, status: boolean): void{
      this.prodService.productCountService(product, status)
  }

  
  addBasket(product: IProduct): void {
    this.orderService.addBasketService(product)
    product.count = 1;
  }

}
