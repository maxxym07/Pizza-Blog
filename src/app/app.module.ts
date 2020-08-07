import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
import { PoductsComponent } from './pages/poducts/poducts.component';
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
import { environment } from '../environments/environment';
import { SeachProductsPipe } from './shared/pipes/seach-products.pipe';
import { BlogSearchPipe } from './shared/pipes/blog-search.pipe';


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
    PoductsComponent,
    BlogComponent,
    AboutComponent,
    SearchPipe,
    SortPipe,
    SeachProductsPipe,
    BlogSearchPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ModalModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    OrderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
