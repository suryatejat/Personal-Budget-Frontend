import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, timer } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://159.203.76.87:3000/user';
  private isAuthenticated: boolean = false;
  private userCredentials:any;
  private timerId: any;

  constructor(private http: HttpClient, private router: Router, private dataService: DataService) { }

  login(user: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + '/login', user).pipe(
      map((res: any) => {
        this.isAuthenticated = true;
        localStorage.setItem('accesstoken', res.token);
        localStorage.setItem('exp', res.exp);
        localStorage.setItem('username', res.username);
        this.userCredentials = user;
        this.startTimer();
        return { status: true };
      }),
      catchError((error) => {
        // console.log(error);
        return of({ status: false, message: error.error.message });
      })
    );
  }

  logout(): void {
    this.isAuthenticated = false;
    this.dataService.removeData();
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

  signup(user: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + '/signup', user).pipe(
      map((res: any) => {
        this.isAuthenticated = true;
        localStorage.setItem('accesstoken', res.token);
        localStorage.setItem('exp', res.exp);
        localStorage.setItem('username', res.username);
        this.userCredentials = user;
        this.startTimer();
        return { status: true };
      }),
      catchError((error) => {
        // console.log(error);
        return of({ status: false, message: error.error.message });
      })
    );
  }

  startTimer(): void {
    console.log("Timer Started");
    let confirmationShow = false;
    this.timerId = setInterval(() => {
      const exp = localStorage.getItem('exp');
      if (exp) {
        const expirationTime = new Date(0).setUTCSeconds(Number(exp));
        const currentTime = new Date().valueOf();
        const timeDifference = expirationTime - currentTime;
        // Check if expiration time is under 20 seconds
        if (timeDifference <= 20000 && timeDifference > 0 && !confirmationShow) {
          // Prompt the user
          confirmationShow = true;
          const extendToken = confirm('Your session will expire in less than 20 seconds. Do you want to extend your session by 1 minute?');

          if (extendToken) {
            // Extend token by 1 minute
            console.log('Your session has been extended by 1 minute.');
            clearInterval(this.timerId);
            this.login(this.userCredentials).subscribe();
          } else {
            // Terminate the token
            localStorage.removeItem('accesstoken');
            localStorage.removeItem('exp');
            localStorage.removeItem("username");
            console.log('Your session has expired.');
            this.logout();
            clearInterval(this.timerId);
          }
        }
      }
    }, 1000); // Check every second
  }
}
