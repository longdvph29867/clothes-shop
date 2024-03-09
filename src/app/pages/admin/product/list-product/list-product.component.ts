import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ProductService } from '../../../../services/product/product.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToasterService } from '../../../../services/toaster/toaster.service';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Product } from '../../../../types/product';
import { ConfirmBoxComponent } from '../../../../components/confirm-box/confirm-box.component';
import { FormatCurrencyPipe } from '../../../../pipes/format-currency.pipe';

@Component({
  selector: 'app-list-product',
  standalone: true,
  imports: [CommonModule, RouterLink, FormatCurrencyPipe],
  templateUrl: './list-product.component.html',
  styleUrl: './list-product.component.css'
})
export class ListProductComponent {
  productsList: Product[] = [];
  constructor(
    private productService: ProductService,
    private spinner: NgxSpinnerService,
    private notification: ToasterService,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getAllProduct();
  }

  getAllProduct() {
    this.spinner.show();
    this.productService.getAll().subscribe((data: any) => {
      this.productsList = data.data.reverse();
      this.spinner.hide();
    }, (error) => {
      this.spinner.hide();
      console.log(error.message);
    })
  }

  delete(id: string) {
    this.productService.delete(id).subscribe(res => {
      this.productsList = this.productsList.filter(item => item._id !== id);
      this.notification.success('Product delete successfull!', '')
    })
  }

  openConfirmBox(id: string) {
    const dialogRef = this.dialog.open(ConfirmBoxComponent, {
      width: '300px',
      data: { title: 'Are you sure you want to delete?', message: '' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.delete(id)
      } else {
      }
    });
  }
}
