import { Component, Input } from '@angular/core';
import { Product } from '../../types/product';

@Component({
  selector: 'app-item-product',
  standalone: true,
  imports: [],
  templateUrl: './item-product.component.html',
  styleUrl: './item-product.component.css'
})
export class ItemProductComponent {
  @Input() product!: Product;
}
