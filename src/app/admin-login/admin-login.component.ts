import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AppService } from '../app.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {


  userLogin: FormGroup;

  constructor(private apis: AppService,
    private _formBuilder: FormBuilder,
    private route: Router,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.formBuild();
  }

  formBuild() {
    this.userLogin = this._formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  submit() {
    if (this.userLogin.invalid) {
      return;
    }

    this.apis.login(this.userLogin.value).subscribe(data => {
      if (data['status'] === 200) {
        this.toastr.success(data['message']);
        this.route.navigate(['dashboard']);
        localStorage.setItem('currunt_user', JSON.stringify(data['data']));
      } else {
        this.toastr.error(data['message']);
      }
    });
  }

}
