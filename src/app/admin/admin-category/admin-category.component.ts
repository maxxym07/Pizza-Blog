import { Component, OnInit, TemplateRef } from '@angular/core';
import { ICategory } from "src/app/shared/interfaces/category.interface";
import { Category } from "src/app/shared/models/category.model";
import { CategoryService } from "src/app/shared/services/category.service";
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.scss']
})
export class AdminCategoryComponent implements OnInit {
  modalRef: BsModalRef;
  adminCategory: Array<ICategory> = [];
  categoryID = 1;
  nameEN: string;
  nameUA: string;

  delete_id: number;

  sortIDCol: boolean;
  sortENCol: boolean;
  sortUACol: boolean;

  categoryStatus = false;//for butDisable

  inputS:string//for search in table

  constructor(private catService: CategoryService, private modalService: BsModalService) { }

  ngOnInit(): void {
    this.adminJSONCategories()
  }


  private adminJSONCategories(): void {
    this.catService.getJSONCategory().subscribe(data => {
      this.adminCategory = data;
    });
  }

  openModal(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template);
  }

  addCategory(): void {
      const newC = new Category(this.categoryID, this.nameEN, this.nameUA);
      delete newC.id;
      this.catService.postJSONCategory(newC).subscribe(
        () => {
          this.adminJSONCategories();
        }
      );
      this.resetForm()
      this.modalService.hide(1);
  }

  deleteModal(template: TemplateRef<any>,category:ICategory): void {
    this.modalRef = this.modalService.show(template);
    this.delete_id=category.id
  }

  deleteCategory(): void {
    this.catService.deleteJSONCategory(this.delete_id).subscribe(
      () => {
        this.adminJSONCategories();
      }
    );
    this.modalService.hide(1);
  }

  checkInputs(): void{
    if (!this.nameUA || !this.nameEN) {
      this.categoryStatus = false;
    }
    else {
      this.categoryStatus = true;
    }
  }

  private resetForm(): void {
    this.categoryID = 1;
    this.nameEN = '';
    this.nameUA = '';
  }

  sortFNameCol():void{
    this.sortIDCol = !this.sortIDCol
    this.sortENCol = false
    this.sortUACol=false
  }
  sortSNameCol():void{
    this.sortENCol = !this.sortENCol
    this.sortIDCol = false
    this.sortUACol=false
  }
  sortTelCol():void{
    this.sortUACol = !this.sortUACol
    this.sortIDCol = false
    this.sortENCol=false
  }
}
