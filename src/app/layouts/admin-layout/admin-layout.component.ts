import { Component } from '@angular/core';
import { MenuAdminComponent } from '../../components/menu-admin/menu-admin.component';
import { RouterOutlet } from '@angular/router';
import { SearchComponent } from '../../components/search/search.component';
import { UserComponent } from '../../components/user/user.component';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [ RouterOutlet, MenuAdminComponent, SearchComponent, UserComponent],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.css'
})
export class AdminLayoutComponent {

}
