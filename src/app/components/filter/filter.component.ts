import { Component } from '@angular/core';
import { CategoryService } from '../../services/category/category.service';
import { Category } from '../../types/category';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css'
})
export class FilterComponent {
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
