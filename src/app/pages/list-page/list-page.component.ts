import { Component } from '@angular/core';
import { Product } from '../../types/product';
import { ProductService } from '../../services/product/product.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonModule } from '@angular/common';
import { FilterComponent } from '../../components/filter/filter.component';
import { ItemProductComponent } from '../../components/item-product/item-product.component';
import { ActivatedRoute } from '@angular/router';
import { Category } from '../../types/category';
import { CategoryService } from '../../services/category/category.service';

@Component({
  selector: 'app-list-page',
  standalone: true,
  imports: [CommonModule, FilterComponent, ItemProductComponent],
  templateUrl: './list-page.component.html',
  styleUrl: './list-page.component.css'
})
export class ListPageComponent {
  listProduct:Product[] = [];
  error: string = '';
  categoryFilter: string = "";
  constructor(
    private productService: ProductService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.categoryFilter = params['category'] ? params['category'] : '';
      this.getAllProduct();
    });
  }

  getAllProduct() {
    this.spinner.show();
    this.productService.getAll("", this.categoryFilter).subscribe((data: any) => {
      this.listProduct = data.data
      this.spinner.hide();
    }, (error) => {
      this.spinner.hide();
      this.error = error.message
    })
  }
}
