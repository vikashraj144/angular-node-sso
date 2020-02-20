import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../core/services';
import { first } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  cookieValue;
  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private router: Router,
    private cookieService: CookieService,
    private authenticationService: AuthenticationService,
  ) { }

  ngOnInit() {

  }

  login() {
    let body = {
      gpid: "vikashraj144@gmail.com",
      password: "12345678"
    }
    this.authenticationService.login(body)
      .pipe(first())
      .subscribe(
        data => {
          this.cookieService.set('token', data.token);
          this.cookieValue = this.cookieService.get('token');
          console.log("TCL: LoginComponent -> ngOnInit -> this.cookieValue", this.cookieValue)
          this.router.navigate(['dashboard']);
        },
        error => {
          console.log("TCL: LoginComponent -> login -> error", error)
        });
  }
}
