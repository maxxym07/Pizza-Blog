import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/shared/interfaces/product.interfaces';
import { ProductService } from 'src/app/shared/services/product.service';
import { ActivatedRoute, Router,Event, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  
  products: Array<IProduct> = [];
  category: string;
  constructor(private prodService: ProductService,
    private actRoute: ActivatedRoute,
    private router: Router) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        const categoryName = this.actRoute.snapshot.paramMap.get('category');
        this.getProducts(categoryName);
      }
    })
 }

  ngOnInit(): void {

  }

    private getProducts(categoryName:string='pizza'): void {
    this.prodService.getCategoryProduct(categoryName).subscribe(data => {
      this.products = data;
      this.category = this.products[0]?.category.nameUA;
    });
  }

}
