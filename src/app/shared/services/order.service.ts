import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { IProduct } from '../interfaces/product.interfaces';
import { IOrder } from '../interfaces/order.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  
  basket: Subject<any> = new Subject<any>();
  private url: string;
  constructor(private http:HttpClient) {
    this.url = 'http://localhost:3000/orders';
   }

  addBasketService(product: IProduct){
    let localProducts: Array<IProduct> = [];
    if (localStorage.length > 0 && localStorage.getItem('myOrder')) {
      localProducts = JSON.parse(localStorage.getItem('myOrder'));
      if (localProducts.some(prod => prod.id === product.id)){
        const index = localProducts.findIndex(prod => prod.id === product.id);
        localProducts[index].count += product.count;
      }
      else {
        localProducts.push(product);
      }
    }
    else {
      localProducts.push(product);
    }
    localStorage.setItem('myOrder', JSON.stringify(localProducts));
    this.basket.next(localProducts);
  }

  addOrder(order: IOrder): Observable<IOrder> {
    return this.http.post<IOrder>(this.url, order);
  }
  
  getOrder(): Observable<Array<IOrder>> {
    return this.http.get<Array<IOrder>>(this.url);
  }

  updateOrder(order: IOrder): Observable<IOrder> {
    return this.http.put<IOrder>(`${this.url}/${order.id}`, order);
  }

  deleteOrder(id: number): Observable<IOrder> {
    return this.http.delete<IOrder>(`${this.url}/${id}`);
  }
  
}
