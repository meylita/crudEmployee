import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public formLogin: FormGroup
  public validation = false;

  constructor(
    public router: Router,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {

    this.formLogin = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    })
  }

  get p() { return this.formLogin.controls; }

  onSubmit() {
    this.validation = true;

    if (this.formLogin.invalid) {
      return;
    }
    if (this.validation) {
      this.toastr.success('Login Success', 'Success');
      setTimeout(() => {
        this.router.navigate(['employee-list']);
      }, 1000);
    }

  }
}