import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AppService } from '../app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashoard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  userList = [];
  id = [];
  loginUsers = [];
  constructor(private apis: AppService,
    private toastr: ToastrService,
    private route: Router) { }

  ngOnInit() {

    /** when new user registered then live streaming */
    this.apis.addedUser.subscribe(data => {
      this.toastr.success(data['message']);
      this.userList.unshift(data['data']);
      this.id.push(data['_id']);
    });

    /** counte connected user */
    this.apis.loginUser.subscribe(data => {
      if (data['status'] === 200) {
        this.loginUsers = data['data'];
      }
    });

    this.fetchUserList();
    // this.getCurrentUser();
  }

  fetchUserList() {
    this.apis.getAllUser().subscribe(data => {
      this.userList = data['data'];
    });
  }

  getCurrentUser() {
    // this.apis.getCurrentUserDetail().subscribe(data => {
    //   console.log('data', data)
    // });
  }

  logout() {
    this.toastr.warning('logout Successfully.');
    this.route.navigate(['/']);
    localStorage.removeItem('currunt_user');
  }

}
