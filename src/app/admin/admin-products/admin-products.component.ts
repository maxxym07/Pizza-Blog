import { Component, OnInit, TemplateRef } from '@angular/core';
import { IProduct } from "src/app/shared/interfaces/product.interfaces";
import { Product } from "src/app/shared/models/product.model";
import { ICategory } from 'src/app/shared/interfaces/category.interface';
import { Observable } from 'rxjs';
import { CategoryService } from 'src/app/shared/services/category.service';
import { ProductService } from 'src/app/shared/services/product.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { OrderPipe } from 'ngx-order-pipe';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnInit {
  modalRef: BsModalRef;//for modal
  config = {
    ignoreBackdropClick: true
  }
  
  categories: Array<ICategory> = [];

  categoryName = "choose category.."; //for select

  adminProduct: Array<IProduct> = [];
  productID = 1;
  productCategory: ICategory = { id: 1, nameEN: 'pizza', nameUA: 'піца' };
  productNameEN: string;
  productNameUA: string;
  productDescription: string;
  productWeight: string;
  productPrice: number;
  productImage: string;
  editStatus = false;

  uploadProgress: Observable<number>;
  imageStatus: boolean;

  inputS: string//for search in table
  sortIDCol: boolean;
  sortENCol: boolean;
  sortUACol: boolean;

  delete_id: number;

  //for sort
  order: string = 'id';
  reverse: boolean = false;
  //for sort


  constructor(private modalService: BsModalService,
    private catService: CategoryService,
    private prodService: ProductService,
    private afStorage: AngularFireStorage,
    private orderPipe: OrderPipe
  ) { }

  ngOnInit(): void {
    this.getCategories();
    this.getProducts();
  }

  private getCategories(): void {
    this.catService.getJSONCategory().subscribe(data => {
      this.categories = data;
    });
  }

  private getProducts(): void {
    this.prodService.getJSONProduct().subscribe(data => {
      this.adminProduct = data;
    });
  }

  setCategory(): void {
    this.productCategory = this.categories.filter(cat => cat.nameEN === this.categoryName)[0];
  }

  openModal(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template,this.config);
  }

  addProduct(): void {
    const product: IProduct = new Product(
      this.productID,
      this.productCategory,
      this.productNameEN,
      this.productNameUA,
      this.productDescription,
      this.productWeight,
      this.productPrice,
      this.productImage);
    if (!this.editStatus) {
      if (this.productNameEN && this.productNameUA && this.productPrice&&this.categoryName !== "choose category..") {
        delete product.id
        this.prodService.postJSONProduct(product).subscribe(
          () => {
            this.getProducts()
          }
        )
    this.resetForm()
      }
      else {
        alert('Головні поля НЕ ЗАПОВНЕНІ  (Category,Name EN, Name UA, Price)')
      }
    }
    else {
      this.prodService.updateJSONProduct(product).subscribe(
        () => {
          this.getProducts();
        }
      );
      this.editStatus = false;
     this.resetForm()
    }
  }

  editModal(template: TemplateRef<any>, product: IProduct): void {
    this.editStatus = true;
    this.modalRef = this.modalService.show(template,this.config);
    this.productID = product.id
    this.categoryName = product.category.nameEN
    this.productNameEN = product.nameEN
    this.productNameUA = product.nameUA
    this.productDescription = product.description
    this.productWeight = product.weight
    this.productPrice = product.price
    this.productImage = product.image
    this.imageStatus = true;
  }

  uploadFile(event): void {
    const file = event.target.files[0];
    const type = file.type.slice(file.type.indexOf('/') + 1);
    const name = file.name.slice(file.name.lastIndexOf('.')).toLowerCase();
    this.imageStatus = false;
    const filePath = `images/${name}.${type}`;
    const task = this.afStorage.upload(filePath, file);
    this.uploadProgress = task.percentageChanges();
    task.then(image => {
      this.afStorage.ref(`images/${image.metadata.name}`).getDownloadURL().subscribe(url => {
        this.productImage = url;
        this.imageStatus = true;
      });
    });

  }


  deleteModal(template: TemplateRef<any>, product: IProduct): void {
    this.modalRef = this.modalService.show(template,this.config);
    this.delete_id = product.id
  }

  deleteProduct(): void {
    this.prodService.deleteJSONProduct(this.delete_id).subscribe(
      () => {
        this.getProducts();
      }
    );
    this.modalService.hide(1);
  }

  //sort pipe
  setOrder(value: string) {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }
    this.order = value;
  }
 //sort pipe

  closeModal(): void {
    this.modalService.hide(1);
    this.productNameEN = '';
    this.productNameUA = '';
    this.productDescription = '';
    this.productWeight = '';
    this.productPrice = null;
    this.imageStatus = false;
    this.categoryName = undefined
    this.editStatus = false;
  }

  //clear form
  private resetForm(): void {
    this.productNameEN = '';
    this.productNameUA = '';
    this.productDescription = '';
    this.productWeight = '';
    this.productPrice = null;
    this.imageStatus = false;
    this.modalService.hide(1);
  }
}
