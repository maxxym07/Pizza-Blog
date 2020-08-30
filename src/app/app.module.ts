import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { AdminCategoryComponent } from './admin/admin-category/admin-category.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminComponent } from './admin/admin.component';
import { AdminBlogsComponent } from './admin/admin-blogs/admin-blogs.component';
import { HomeComponent } from './pages/home/home.component';
import { BlogComponent } from './pages/blog/blog.component';
import { AboutComponent } from './pages/about/about.component';

import { ModalModule } from 'ngx-bootstrap/modal';
import { SearchPipe } from './shared/pipes/search.pipe';
import { SortPipe } from './shared/pipes/sort.pipe';
import { OrderModule } from 'ngx-order-pipe';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from '../environments/environment.prod';
import { SeachProductsPipe } from './shared/pipes/seach-products.pipe';
import { BlogSearchPipe } from './shared/pipes/blog-search.pipe';
import { BasketComponent } from './pages/basket/basket.component';
import { ProductComponent } from './pages/product/product.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { OrderSearchPipe } from './shared/pipes/order-search.pipe';


import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';

import { NgxUiLoaderModule, NgxUiLoaderRouterModule } from 'ngx-ui-loader';
import { loaderConfig } from './preloader-config';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    AdminCategoryComponent,
    AdminProductsComponent,
    AdminComponent,
    AdminBlogsComponent,
    HomeComponent,
    BlogComponent,
    AboutComponent,
    SearchPipe,
    SortPipe,
    SeachProductsPipe,
    BlogSearchPipe,
    BasketComponent,
    ProductDetailsComponent,
    ProductComponent,
    PaymentComponent,
    AdminOrdersComponent,
    OrderSearchPipe,
    ProfileComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ModalModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    OrderModule,
    NgxUiLoaderModule.forRoot(loaderConfig),
    NgxUiLoaderRouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
