import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from '../app.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  userRegister: FormGroup;

  constructor(private _formBuilder: FormBuilder,
    private toastr: ToastrService,
    private apis: AppService) { }

  ngOnInit() {
    this.formBuild();
  }

  formBuild() {
    this.userRegister = this._formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      age: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      gender: ['MALE', [Validators.required]]
    });
  }


  submit() {
    if (this.userRegister.invalid) {
      return;
    }
    this.apis.registerUser(this.userRegister.value).subscribe(data => {
      this.userRegister.reset();
      this.userRegister.patchValue({ gender: 'MALE' });
      this.toastr.success('Successfull register...');
    });
  }
}
