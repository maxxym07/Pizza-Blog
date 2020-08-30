import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProduct } from 'src/app/shared/interfaces/product.interfaces';
import { AngularFirestore, DocumentChangeAction, DocumentReference } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private url: string;
  constructor(private http: HttpClient,private firestore:AngularFirestore) {
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

  getCategoryProduct(name: string): Observable<Array<IProduct>> {
    return this.http.get<Array<IProduct>>(`${this.url}?category.nameEN=${name}`);
  }

  getOneProduct(id: number): Observable<IProduct> {
    return this.http.get<IProduct>(`${this.url}/${id}`);
  }

  productCountService(product: IProduct, status: boolean):number {
    if (status) {
      return product.count++;
    }
    else {
      if (product.count > 1) {
       return product.count--;
      }
    }
  }

  /////////////////////FireCloud/////////////////////////////////
  
  getFireCloudProduct(): Observable<DocumentChangeAction<unknown>[]>{
    return this.firestore.collection('products').snapshotChanges()
  }

  postFireCloudProduct(product:IProduct): Promise<DocumentReference>{
    return this.firestore.collection('products').add(product);
  }

  deleteFireCloudProduct(id:number): Promise<void>{
    return this.firestore.collection('products').doc(id.toString()).delete();
  }

  updateFireCloudProduct(product:IProduct): Promise<void>{
    return this.firestore.collection('products').doc(product.id.toString()).update(product);
  }



}
