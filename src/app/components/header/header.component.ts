import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserInfo } from '../../types/user';
import { LocalService } from '../../services/local/local.service';
import { MenuComponent } from '../menu/menu.component';
import { SearchComponent } from '../search/search.component';
import { UserComponent } from '../user/user.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, MenuComponent, SearchComponent, UserComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
}
