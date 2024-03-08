import { Component, Input } from '@angular/core';
import { Product } from '../../types/product';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-item-product',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './item-product.component.html',
  styleUrl: './item-product.component.css'
})
export class ItemProductComponent {
  @Input() product!: Product;
}
