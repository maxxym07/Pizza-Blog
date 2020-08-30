import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProductComponent } from './pages/product/product.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { BlogComponent } from './pages/blog/blog.component';
import { AboutComponent } from './pages/about/about.component';
import { BasketComponent } from './pages/basket/basket.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { AdminComponent } from './admin/admin.component';
import { AdminCategoryComponent } from './admin/admin-category/admin-category.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminBlogsComponent } from './admin/admin-blogs/admin-blogs.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { ProfileGuard } from './shared/guards/profile.guard';



const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {path:'home',component:HomeComponent},
  {path:'products',component:ProductComponent},
  {path:'blog',component:BlogComponent},
  { path: 'about', component: AboutComponent },
  { path: 'payment', component: PaymentComponent },
  { path: 'basket', component: BasketComponent },
  { path: 'menu/:category', component: ProductComponent },
  { path: 'menu/:category/:name', component: ProductDetailsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent,canActivate: [ProfileGuard] },
  {path: 'admin', component: AdminComponent, canActivate: [AuthGuard], children: [
    { path: '', redirectTo: 'category', pathMatch: 'full' },
    { path: 'category', component:AdminCategoryComponent },
    { path: 'products', component:AdminProductsComponent },
    { path: 'blogs', component: AdminBlogsComponent },
    { path: 'orders', component: AdminOrdersComponent },
  ] },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{scrollPositionRestoration:'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
