import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LocalService } from '../../services/local/local.service';
import { ToasterService } from '../../services/toaster/toaster.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  form!: FormGroup;
  submitted = false;
  emailPattern: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  constructor(
    private fb: FormBuilder,
    public authService: AuthService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private notification: ToasterService,
    private localService: LocalService,
    ) {
    this.form = this.fb.group({
      "email": ["", [Validators.required, Validators.pattern(this.emailPattern)]],
      "account":["", Validators.required],
      "fullName":["", Validators.required],
      "password":["", Validators.required],
      "confirmPassword":["", Validators.required]
    }, { validator: this.checkPasswords });
  }

  checkPasswords(g: FormGroup) {
    const pass = g.controls['password'].value;
    const confirmPass = g.controls['confirmPassword'].value;
    return pass === confirmPass ? null : { notSame: true };
  }
  get f() {
    return this.form.controls;
  }
  submit() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    const data = this.form.value;
    delete data.confirmPassword;
    this.spinner.show();
    this.authService.register(data).subscribe((res:any)=>{
      this.spinner.hide();
      this.notification.success('Register Successfull!', '')
      this.router.navigateByUrl('/auth/login');
    },
    (error) => {
      this.spinner.hide();
      this.notification.error(error.error.message!, '')
      console.log(error);
    })
  }
}
