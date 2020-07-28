import { Component, OnInit } from '@angular/core';
import { BlogsService } from '../../shared/services/blogs.service';
import { IBlog } from "src/app/shared/interfaces/blog.interfaces"
import { Blog } from "src/app/shared/models/blog.model"

@Component({
  selector: 'app-admin-blogs',
  templateUrl: './admin-blogs.component.html',
  styleUrls: ['./admin-blogs.component.scss']
})
export class AdminBlogsComponent implements OnInit {
  adminBlog: Array<IBlog> = [];
  editStatus=false;
  bID: number = 1;
  bTitle: string;
  bAuthor: string;
  bText: string;
  dImage='https://cdn.segodnya.ua/i/image_650x/media/image/5d9/c90/e8a/5d9c90e8a57a5.jpg'

  constructor(private blogService:BlogsService) { }

  ngOnInit(): void {
    this.adminJSONBlogs()
  }

  private adminJSONBlogs(): void{
    this.blogService.getJSONBlogs().subscribe(data => {
      this.adminBlog=data
    })
  }

  addBlog(): void{
    const newB = new Blog(this.bID, this.bTitle, this.bText, this.bAuthor,this.dImage,new Date);
    if (!this.editStatus) {
      if (!this.bTitle || !this.bText || !this.bAuthor) {
        alert('Заповніть всі поля')
      }
      else {
        delete newB.id;
        this.blogService.postJSONBlog(newB).subscribe(
          () => {
            this.adminJSONBlogs();
          }
        );
        this.resetForm()
      }
    }
    else {
      this.blogService.updateJSONBlog(newB).subscribe(
        () => {
          this.adminJSONBlogs();
        }
      );
      this.editStatus = false;
      this.resetForm()
    }
    
  }

  deleteDiscount(blog:IBlog): void{
    if (confirm('Are you sure?')) {
      this.blogService.deleteJSONBlog(blog.id).subscribe(
        () => {
          this.adminJSONBlogs()
        }
      );
    }
  }

  editDiscount(blog: IBlog): void{
    this.bID = blog.id;
    this.bTitle = blog.title;
    this.bText = blog.text;
    this.bAuthor=blog.author
    this.editStatus = true;
  }

  private resetForm(): void {
    this.bID = 1;
    this.bTitle = '';
    this.bText = '';
    this.bAuthor = '';
  }
}
