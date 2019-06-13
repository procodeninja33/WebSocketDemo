import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AppService } from '../app.service';

@Component({
  selector: 'app-dashoard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  userList = [];
  id = [];
  constructor(private apis: AppService,
    private toastr: ToastrService) { }

  ngOnInit() {
    const userType = JSON.parse(localStorage.getItem('user_type'));
    this.apis.addedUser.subscribe(data => {
      if (userType === 'ADMIN') {
        this.toastr.success(' New user registred...');
        this.userList.unshift(data['data']);
        this.id.push(data['data']['_id']);
      }
    });
    this.fetchUserList();
  }

  fetchUserList() {
    this.apis.getAllUser().subscribe(data => {
      this.userList = data['data'];
    });
  }

}
