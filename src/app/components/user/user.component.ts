import { Component } from '@angular/core';
import { UserInfo } from '../../types/user';
import { LocalService } from '../../services/local/local.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  userInfo!: UserInfo | null;
  constructor(private localService: LocalService) {}
  ngOnInit(): void {
    this.userInfo = this.localService.get();
  }

  handleLogout() {
    this.localService.remove();
    location.href = '/'
  }
}
