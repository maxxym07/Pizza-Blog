import { Injectable } from '@angular/core';
import { IBlog } from '../interfaces/blog.interfaces';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogsService {
  private arrBlogs: Array<IBlog> = [{
    id: 1,
    title: 'Title 1',
    text: 'Some text',
    author: 'admin',
    image: 'https://cdn.segodnya.ua/i/image_650x/media/image/5d9/c90/e8a/5d9c90e8a57a5.jpg'
  }
  ];
  private url: string;
  constructor(private http:HttpClient) {
    this.url='http://localhost:3000/blogs'
   }

  getJSONBlogs(): Observable<Array<IBlog>>{
     return this.http.get<Array<IBlog>>(this.url)
  }
  
  postJSONBlog(blog: IBlog): Observable<IBlog>{
    return this.http.post<IBlog>(this.url, blog);
  }

  deleteJSONBlog(id: number): Observable<IBlog>{
    return this.http.delete<IBlog>(`${this.url}/${id}`);
  }

  updateJSONBlog(discount: IBlog): Observable<IBlog>{
    return this.http.put<IBlog>(`${this.url}/${discount.id}`, discount);
  }
}
