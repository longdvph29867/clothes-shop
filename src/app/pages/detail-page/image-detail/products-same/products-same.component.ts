import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ItemProductComponent } from '../../../../components/item-product/item-product.component';
import { Product } from '../../../../types/product';

@Component({
  selector: 'app-products-same',
  standalone: true,
  imports: [CommonModule, ItemProductComponent],
  templateUrl: './products-same.component.html',
  styleUrl: './products-same.component.css'
})
export class ProductsSameComponent {
 @Input() productsSame: Product[] = []
}
