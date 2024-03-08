import { Component } from '@angular/core';
import { ItemProductComponent } from '../item-product/item-product.component';
import { ProductService } from '../../services/product.service';
import { Product } from '../../types/product';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-product',
  standalone: true,
  imports: [CommonModule, ItemProductComponent],
  templateUrl: './list-product.component.html',
  styleUrl: './list-product.component.css'
})
export class ListProductComponent {
  listProduct:Product[] = [];
  error: string = '';
  constructor(
    private productService: ProductService,
    private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.getAllProduct();
  }
  getAllProduct() {
    this.spinner.show();
    this.productService.getAll().subscribe((data: any) => {
      this.listProduct = data.data.slice(0,8)
      this.spinner.hide();
    }, (error) => {
      this.spinner.hide();
      this.error = error.message
    })
  }
}
