import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LayoutComponent } from './layouts/layout/layout.component';
import { authGuard } from './guard/auth.guard';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { DetailPageComponent } from './pages/detail-page/detail-page.component';
import { LoginLayoutComponent } from './layouts/login-layout/login-layout.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { ListProductComponent } from './pages/admin/product/list-product/list-product.component';
import { AddProductComponent } from './pages/admin/product/add-product/add-product.component';
import { EditProductComponent } from './pages/admin/product/edit-product/edit-product.component';

export const routes: Routes = [
  {
    'path': '', component: LayoutComponent,
    children: [
      {
        'path': '',
        component: HomeComponent,
      },
      {
        'path': 'products',
        component: ListPageComponent,
      },
      {
        'path': 'detail/:slug',
        component: DetailPageComponent,
      },
    ]
  },
  {
    'path': 'auth', component: LoginLayoutComponent,
    children: [
      {
        'path': 'login',
        component: LoginComponent,
      },
      {
        'path': 'register',
        component: RegisterComponent,
      },
    ]
  },
  {
    'path': 'admin', component: AdminLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        'path': 'products',
        component: ListProductComponent,
      },
      {
        'path': 'products/add',
        component: AddProductComponent,
      },
      {
        'path': 'products/edit/:slug',
        component: EditProductComponent,
      },
    ]
  },
];
