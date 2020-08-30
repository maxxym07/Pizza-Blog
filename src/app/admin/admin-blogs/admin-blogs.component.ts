import { Component, OnInit, TemplateRef } from '@angular/core';
import { BlogsService } from '../../shared/services/blogs.service';
import { IBlog } from "src/app/shared/interfaces/blog.interfaces"
import { Blog } from "src/app/shared/models/blog.model"
import { OrderPipe } from 'ngx-order-pipe';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-admin-blogs',
  templateUrl: './admin-blogs.component.html',
  styleUrls: ['./admin-blogs.component.scss']
})
export class AdminBlogsComponent implements OnInit {
  modalRef: BsModalRef;//for modal
  config = {
    ignoreBackdropClick: true
  }
  adminBlog: Array<IBlog> = [];
  editStatus=false;
  bID: number = 1;
  bTitle: string;
  bAuthor: string;
  bText: string;
  dImage='https://cdn.segodnya.ua/i/image_650x/media/image/5d9/c90/e8a/5d9c90e8a57a5.jpg'

  inputS: string;
  delete_id: number;

    //for sort
    order: string = 'id';
    reverse: boolean = false;
    //for sort

  constructor(private blogService: BlogsService,
    private orderPipe: OrderPipe,
    private modalService: BsModalService,
    private afStorage: AngularFireStorage,
  ) { }

  ngOnInit(): void {
    // this.adminJSONBlogs()
    this.adminFirebaseDiscounts();
  }

  // private adminJSONBlogs(): void{
  //   this.blogService.getJSONBlogs().subscribe(data => {
  //     this.adminBlog=data
  //   })
  // }

  private adminFirebaseDiscounts(): void {
    this.blogService.getFirecloudDiscounts().subscribe(
      collection => {
        this.adminBlog = collection.map(discount => {
          const data = discount.payload.doc.data() as IBlog;
          const id = discount.payload.doc.id;
          return {id, ...data };
        });
      }
    );
  }

  openModal(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template,this.config);
  }

  addBlog(): void{
    const newB = new Blog(this.bID, this.bTitle, this.bText, this.bAuthor,this.dImage,new Date);
    if (!this.editStatus) {
      if (!this.bTitle || !this.bText || !this.bAuthor) {
        alert('Заповніть всі поля')
      }
      else {
        delete newB.id;
        // this.blogService.postJSONBlog(newB).subscribe(
        //   () => {
        //     this.adminJSONBlogs();
        //   }
        // );
        this.blogService.postFirecloudDiscounts(Object.assign({},newB))
        this.resetForm()
      }
    }
    else {
      // this.blogService.updateJSONBlog(newB).subscribe(
      //   () => {
      //     this.adminJSONBlogs();
      //   }
      // );
      this.blogService.editFirecloudDiscounts(Object.assign({},newB))
      this.editStatus = false;
      this.resetForm()
    }
    
  }


  deleteModal(template: TemplateRef<any>, adminBlog: IBlog): void {
    this.modalRef = this.modalService.show(template,this.config);
    this.delete_id = adminBlog.id
  }

  deleteBlog(): void {
    // this.blogService.deleteJSONBlog(this.delete_id).subscribe(
    //   () => {
    //     this.adminJSONBlogs();
    //   }
    // );
    this.blogService.deleteFirecloudDiscounts(this.delete_id)
    this.modalService.hide(1);
  }

  editModal(template: TemplateRef<any>,blog: IBlog): void{
    this.editStatus = true;
    this.modalRef = this.modalService.show(template,this.config);
    this.bID = blog.id;
    this.bTitle = blog.title;
    this.bText = blog.text;
    this.bAuthor=blog.author
  }

  private resetForm(): void {
    this.bID = 1;
    this.bTitle = '';
    this.bText = '';
    this.bAuthor = '';
    this.modalService.hide(1);
  }

  closeModal(): void {
    this.bID = 1;
    this.bTitle = '';
    this.bText = '';
    this.bAuthor = '';
    this.modalService.hide(1);
    this.editStatus = false;
  }

    //sort pipe
    setOrder(value: string) {
      if (this.order === value) {
        this.reverse = !this.reverse;
      }
      this.order = value;
    }
}
