import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private router: Router,
    private cookieService: CookieService
    ) { }

  ngOnInit() {
  }

  logout() {
    console.log('====================================');
    console.log('Logout');
    this.router.navigate(['/']);
    localStorage.removeItem('token');
    console.log('====================================');
  }
  profile() {
    console.log('====================================');
    this.router.navigate(['/profile']);
    console.log('====================================');
  }

  dashboard() {
    console.log('====================================');
    this.router.navigate(['/dashboard']);
    console.log('====================================');
  }
}
