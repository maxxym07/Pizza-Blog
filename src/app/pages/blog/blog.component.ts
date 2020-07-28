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
    this.userJSONBlog();
  }

  private userJSONBlog(): void {
    this.blogService.getJSONBlogs().subscribe(data => {
      this.userBlogs = data;
    })
  }
}
