import { Component, OnInit } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  decodedToken: any;
  showFiller = false;

  constructor(private router: Router) { }


  ngOnInit() {

    let token = localStorage.getItem('token')
    this.decodedToken = jwt_decode(token);
    console.log("TCL: DashboardComponent -> ngOnInit -> decodedToken", this.decodedToken)

  }

  logout() {
    console.log('====================================');
    console.log('Logout');
    console.log('====================================');
  }

  profile() {
    console.log('====================================');
    console.log('Logout');
    this.router.navigate(['/profile']);
    console.log('====================================');
  }
}
