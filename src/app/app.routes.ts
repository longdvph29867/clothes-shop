import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LayoutComponent } from './layouts/layout/layout.component';
import { authGuard } from './guard/auth.guard';

export const routes: Routes = [
  {
    'path': '', component: LayoutComponent,
    children: [
      {
        'path': '',
        component: HomeComponent,
      },
    ]
  },
];
