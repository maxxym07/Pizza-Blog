import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/shared/interfaces/product.interfaces';
import { OrderService } from 'src/app/shared/services/order.service';
import { ProductService } from 'src/app/shared/services/product.service';
import { NgForm } from '@angular/forms';
import { Order } from '../../shared/models/order.model';


@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {
  orders: Array<IProduct> = [];
  totalPrice = 0;

  orderID = 1;
  userName: string;
  userPhone: string;
  userCity: string;
  userStreet: string;
  userHouse: string;
  userComments: string;


  constructor(private orderService: OrderService,
    private prodService: ProductService,) { }

  ngOnInit(): void {
    this.getBasket();
    this.getTotal();
  }

  private getBasket(): void{
    if (localStorage.length > 0 && localStorage.getItem('myOrder')) {
      this.orders = JSON.parse(localStorage.getItem('myOrder'));
    }
  }

  productCount(product: IProduct, status: boolean): void{
    this.prodService.productCountService(product, status)
    this.getTotal();
    this.updateBasket();
    this.orderService.basket.next('check');
}


private getTotal(): void {
  this.totalPrice = this.orders.reduce((total, prod) => {
    return total + (prod.price * prod.count);
  }, 0);
}

private updateBasket(): void {
  localStorage.setItem('myOrder', JSON.stringify(this.orders));
}

deleteProduct(product: IProduct): void {
  if (confirm('Are you sure')) {
    const index = this.orders.findIndex(prod => prod.id === product.id)
    this.orders.splice(index, 1);
    this.updateBasket();
    this.getTotal();
    this.orderService.basket.next('check');
  }
}

addOrder(form:NgForm): void{
  const order = new Order(this.orderID,
    form.controls.userName.value,
    form.controls.userPhone.value,
    form.controls.userCity.value,
    form.controls.userStreet.value,
    form.controls.userHouse.value,
    this.orders,
    this.totalPrice,
    new Date(),
    form.controls.userComments.value)
    
    delete order.id;
  this.orderService.addOrder(order).subscribe(
    () => {
      this.resetBasket()
    }
  )
}
private resetBasket(): void{
  localStorage.clear();
  this.orders = [];
  this.totalPrice = 0;
  this.orderService.basket.next('check');
}
  
}
