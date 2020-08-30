import { Component, OnInit } from '@angular/core';
import { IBlog } from 'src/app/shared/interfaces/blog.interfaces';
import { BlogsService } from '../../shared/services/blogs.service';


@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  userBlogs: Array<IBlog> = [];

  constructor(private blogService:BlogsService) { }

  ngOnInit(): void {
    // this.userJSONBlog();
    this.getBlogs();
  }


  // private userJSONBlog(): void {
  //   this.blogService.getJSONBlogs().subscribe(data => {
  //     this.userBlogs = data;
  //   })
  // }

  private getBlogs(): void {
    this.blogService.getFirecloudDiscounts().subscribe(
      collection => {
        this.userBlogs = collection.map(discount => {
          const data = discount.payload.doc.data() as IBlog;
          const id = discount.payload.doc.id;
          return {id, ...data };
        });
      }
    );
  }
  
}
