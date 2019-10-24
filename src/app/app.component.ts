import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(
    private apiService: AppService
  ) { }
  ngOnInit() {
    // this.apiService.getUserDetail().subscribe((data) => {
    //   if (data) {
    //     this.apiService.setCurrentUserDetail(data['data']);
    //   }
    // });
  }

}
