import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

// import { User } from '/_models';

export class User {
    id: number;
    emailId: string;
    firstName: string;
    lastName: string;
    token: string;
}

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(body) {
        return this.http.post<any>(`${environment.apiUrl}/V1/login`, body)
            .pipe(map(user => {
                // console.log("TCL: AuthenticationService -> login -> user", user.token)
                localStorage.setItem('token', user.token);
                this.currentUserSubject.next(user.token);
                console.log("TCL: AuthenticationService -> login -> this.currentUserSubject", this.currentUserSubject)
                return user;
            }));
    }

    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}