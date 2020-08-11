import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/shared/interfaces/product.interfaces';
import { OrderService } from 'src/app/shared/services/order.service';
import { ProductService } from 'src/app/shared/services/product.service';


@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {
  order: Array<IProduct> = [];
  totalPrice = 0;

  constructor(private orderService: OrderService,
    private prodService: ProductService,) { }

  ngOnInit(): void {
    this.getBasket();
    this.getTotal();
  }

  private getBasket(): void{
    if (localStorage.length > 0 && localStorage.getItem('myOrder')) {
      this.order = JSON.parse(localStorage.getItem('myOrder'));
    }
  }

  productCount(product: IProduct, status: boolean): void{
    this.prodService.productCountService(product, status)
    this.getTotal();
    this.updateBasket();
    this.orderService.basket.next('check');
}


  private getTotal(): void {
    this.totalPrice = this.order.reduce((total, prod) => {
      return total + (prod.price * prod.count);
    }, 0);
  }
  
  private updateBasket(): void{
    localStorage.setItem('myOrder', JSON.stringify(this.order));
  }

}
