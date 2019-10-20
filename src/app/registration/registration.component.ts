import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from '../app.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  userRegister: FormGroup;

  constructor(private _formBuilder: FormBuilder,
    private toastr: ToastrService,
    private apis: AppService,
    private route: Router) { }

  ngOnInit() {
    this.formBuild();
  }

  formBuild() {
    this.userRegister = this._formBuilder.group({
      usr_name: ['', [Validators.required]],
      usr_email: ['', [Validators.required]],
      usr_password: ['', [Validators.required]],
      usr_age: ['', [Validators.required]],
      usr_phoneNumber: ['', [Validators.required]],
      usr_gender: ['MALE', [Validators.required]]
    });
  }


  submit() {

    if (this.userRegister.invalid) {
      return;

    } else {

      this.apis.registerUser(this.userRegister.value).subscribe(data => {
        console.log(data);
        if (data['status'] === 200) {
          this.userRegister.reset();
          this.userRegister.patchValue({ gender: 'MALE' });
          this.toastr.success(data['message']);
          this.route.navigate(['/login']);
        } else {
          this.toastr.error(data['message']);
        }
      });
    }
  }

  back() {
    this.route.navigate(['/']);
  }
}
