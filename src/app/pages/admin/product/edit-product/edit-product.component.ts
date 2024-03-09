import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../../../services/product/product.service';
import { CategoryService } from '../../../../services/category/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToasterService } from '../../../../services/toaster/toaster.service';
import { ImageService } from '../../../../services/image/image.service';
import { Category } from '../../../../types/category';
import { CommonModule } from '@angular/common';
import { Product } from '../../../../types/product';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent {
  error: string = '';
  form!: FormGroup;
  product!: Product;
  slug!: string;
  selectedImageBase64: string | null = null;
  submitted = false;
  constructor(
    public productsService: ProductService,
    public categoryService: CategoryService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private notification: ToasterService,
    private imageService: ImageService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    ) {}
  categories: Category[] = [];
  ngOnInit(): void {
    this.form = this.fb.group({
      "name": ["", [Validators.required]],
      "price": ["", [Validators.required]],
      "images": [""],
      "gender": ["", [Validators.required]],
      "desc": ["", [Validators.required]],
      "id_category": ["", [Validators.required]],
      "imagesSource": [""],
    }, { validator: this.checkImage })
    this.slug = this.route.snapshot.params['slug'];
    this.getAllCategory();
    this.getMovie(this.slug);
  }

  checkImage(g: FormGroup) {
    const file = g.controls['imagesSource'].value;
    if(file) {
      const fileExtension = file.name.split('.').pop();
      const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];
      if(!(fileExtension && allowedExtensions.includes(fileExtension.toLowerCase()))) {
        return { 'fileTypeExceeded': true };
      }
    }
    if (file && file.size > 1024 *1024) {
      return { 'fileSizeExceeded': true };
    }
    return null;
  }

  setValue() {
    if (this.product) {
      this.selectedImageBase64 = this.product.images[0]
      this.form.patchValue({
        name: this.product.name,
        images: '',
        price: this.product.price,
        desc: this.product.desc,
        gender: this.product.gender,
        id_category: this.product.id_category,
      });
    }
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if(file) {
      const fileExtension = file.name.split('.').pop();
      const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];
      if (fileExtension && allowedExtensions.includes(fileExtension.toLowerCase())) {
        const reader = new FileReader();
        reader.onloadend = () => {
          this.selectedImageBase64 = reader.result as string;
        };
        reader.readAsDataURL(file);
      }
    }
    else {
      this.selectedImageBase64 = this.product.images[0];
    }
    if (file) {
      this.form.patchValue({
        imagesSource: file
      });
    }
  }

  handleChangeImage(event: any): void {
    this.onFileSelected(event)
  }

  getAllCategory() {
    this.spinner.show();
    this.categoryService.getAll().subscribe((data: any) => {
      this.categories = data.data
      this.spinner.hide();
    }, (error) => {
      this.error = error.message
      this.spinner.hide();
    })
  }

  getMovie(slug: string) {
    this.spinner.show();
    this.productsService.getDetail(slug).subscribe((data: any) => {
      this.spinner.hide();
      this.product = data.data
      this.setValue();
    }, (error) => {
      this.spinner.hide();
      this.error = error.message
    })
  }

  get f(){
    return this.form.controls;
  }

  putProduct (slug: string, data: Product) {
    this.productsService.update(slug, data).subscribe((res:any)=>{
      this.spinner.hide();
      this.notification.success('Product update successfull!', '')
      this.router.navigateByUrl('admin/products');
    },
    (error) => {
      this.spinner.hide();
      console.log(error);
    })
  }
  submit() {
    this.submitted = true;
    if (this.form.invalid) {
      Object.keys(this.form.controls).forEach(key => {
        const controlErrors = this.form.get(key)?.errors;
        if (controlErrors != null) {
          console.log(key, controlErrors);
        }
      });
      return;
    }
    if(this.form.get('imagesSource')?.value) {
      const file = this.form.get('imagesSource')?.value;
      const formData = new FormData();
      formData.append('images', file);
      this.spinner.show();
      this.imageService.create(formData).subscribe((res:any)=>{
        const data = {...this.form.value, images: res.data.map((item: any) => item.url)}
        delete data.imagesSource;
        this.putProduct(this.slug, data)
      }, (error) => {
        this.spinner.hide();
        this.notification.error(error.error.message!, '')
        console.log(error);
      })
    }
    else {
      const data = {...this.form.value, images: [this.selectedImageBase64]}
      delete data.imagesSource;

      this.spinner.show();
      this.putProduct(this.slug, data)
    }
  }
}
