import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { Observable, timer } from 'rxjs';

@Component({
  selector: 'pb-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  showError : boolean = false;
  errorMessage !: string;

  constructor(private userService: UserService, private router: Router){}

  onSubmit(data: any){
    const user = {
      "username": data.username,
      "email": data.email,
      "password": data.password
    }
    this.userService.signup(user).subscribe((data:any) => {
      this.router.navigate([''])
    }, (error) => {
      this.errorMessage = error.error.message;
      this.showErrorMessageForDuration(5000);
    })
  }

  showErrorMessageForDuration(duration: number) {
    this.showError = true;
    timer(duration).subscribe(() => {
      this.showError = false;
    });
  }
}
