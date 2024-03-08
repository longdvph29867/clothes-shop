import { Component, inject } from '@angular/core';
import { BannerComponent } from '../../components/banner/banner.component';
import { HowItWorkComponent } from '../../components/how-it-work/how-it-work.component';
import { ListProductComponent } from '../../components/list-product/list-product.component';
import { Banner2Component } from '../../components/banner2/banner2.component';
import { ShoppingFeaturesComponent } from '../../components/shopping-features/shopping-features.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ BannerComponent, HowItWorkComponent, ListProductComponent, Banner2Component, ShoppingFeaturesComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {

}
