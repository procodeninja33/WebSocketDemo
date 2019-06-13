import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  userDetails: any;
  constructor(private route: Router,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.userDetails = JSON.parse(localStorage.getItem('currunt_user'));
  }

  logout() {
    if (confirm('Are you sure want to logout ?')) {
      this.toastr.warning('Logout successfully.');
      this.route.navigate(['/']);
      localStorage.removeItem('currunt_user');
    }
  }

}
