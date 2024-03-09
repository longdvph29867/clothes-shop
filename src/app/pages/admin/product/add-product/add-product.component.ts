import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Category } from '../../../../types/category';
import { ImageService } from '../../../../services/image/image.service';
import { ToasterService } from '../../../../services/toaster/toaster.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { CategoryService } from '../../../../services/category/category.service';
import { ProductService } from '../../../../services/product/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent {
  error: string = '';
  form!: FormGroup;
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
    ) {}
  categories: Category[] = [];
  ngOnInit(): void {
    this.form = this.fb.group({
      "name": ["", [Validators.required]],
      "price": ["", [Validators.required]],
      "images": ["", [Validators.required]],
      "gender": ["", [Validators.required]],
      "desc": ["", [Validators.required]],
      "id_category": ["", [Validators.required]],
      "imagesSource": ["", [Validators.required]],
    }, { validator: this.checkImage })
    this.getAllCategory();
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
      this.selectedImageBase64 = null;
    }

    if (event.target.files.length > 0) {
      const file = event.target.files[0];
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

  get f(){
    return this.form.controls;
  }

  postImages(file: any): void {
    const formData = new FormData();
    formData.append('images', file);
    this.imageService.create(formData).subscribe((res:any)=>{
        return res.data[0].url
    }, (error) => {
      this.notification.error(error.error.message!, '')
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


    const file = this.form.get('imagesSource')?.value;
    const formData = new FormData();
    formData.append('images', file);

    this.spinner.show();
    this.imageService.create(formData).subscribe((res:any)=>{
      const data = {...this.form.value, images: res.data.map((item: any) => item.url)}
      delete data.imagesSource;

      this.productsService.create(data).subscribe((res:any)=>{
        this.spinner.hide();
        this.notification.success('Product created Successfull!', '')
        this.router.navigateByUrl('admin/products');
      },
      (error) => {
        this.spinner.hide();
        console.log(error);
      })

    }, (error) => {
      this.spinner.hide();
      this.notification.error(error.error.message!, '')
      console.log(error);
    })
  }
}
