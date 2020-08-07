import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProduct } from 'src/app/shared/interfaces/product.interfaces';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private url: string;
  constructor(private http: HttpClient) {
    this.url = 'http://localhost:3000/products';
  }

  getJSONProduct(): Observable<Array<IProduct>> {
    return this.http.get<Array<IProduct>>(this.url);
  }
  
  postJSONProduct(product: IProduct): Observable<IProduct> {
    return this.http.post<IProduct>(this.url, product);
  }

  deleteJSONProduct(id: number): Observable<IProduct> {
    return this.http.delete<IProduct>(`${this.url}/${id}`);
  }

  updateJSONProduct(product: IProduct): Observable<IProduct>{
    return this.http.put<IProduct>(`${this.url}/${product.id}`, product);
  }
}
