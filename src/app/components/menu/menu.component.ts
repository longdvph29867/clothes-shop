import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Category } from '../../types/category';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../services/category/category.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  categories: Category[] = [];
  constructor (
    public categoryService: CategoryService
  ) {}
  ngOnInit(): void {
    this.getAllCategory();
  }
  getAllCategory() {
    this.categoryService.getAll().subscribe((data: any) => {
      this.categories = data.data
    }, (error) => {
      console.log(error.message);
    })
  }
}
