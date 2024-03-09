import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ImageDetailComponent } from './image-detail/image-detail.component';
import { Product } from '../../types/product';
import { ProductService } from '../../services/product/product.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute } from '@angular/router';
import { ProductsSameComponent } from './image-detail/products-same/products-same.component';
import { FormatCurrencyPipe } from '../../pipes/format-currency.pipe';

@Component({
  selector: 'app-detail-page',
  standalone: true,
  imports: [CommonModule, ImageDetailComponent, ProductsSameComponent, FormatCurrencyPipe],
  templateUrl: './detail-page.component.html',
  styleUrl: './detail-page.component.css'
})
export class DetailPageComponent {

  product:Partial<Product> = {};
  productsSame: Product[] = [];
  constructor (
    private productService: ProductService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.route.params.subscribe(params => {
      const slug = params['slug'];
      if (slug) {
        this.getDetail(slug);
      } else {
        return;
      }
    });

  }
  getDetail(slug: string) {
    this.spinner.show();
    this.productService.getDetail(slug).subscribe((data: any) => {
    this.spinner.hide();

      this.product = data.data
      this.getProductSame(data.data.id_category)
    }, (error) => {
      this.spinner.hide();
      console.log(error.message);
    })
  }
  getProductSame(id: string) {
    this.productService.getSame(id).subscribe((data: any) => {
      this.productsSame = data.data.filter((item: any) => item.slug !== this.product.slug).slice(0,4);
    }, (error) => {
      console.log(error.message);
    })
  }
}
