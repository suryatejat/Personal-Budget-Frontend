import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import {timer } from 'rxjs';

@Component({
  selector: 'pb-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  showError : boolean = false;
  errorMessage !: string;

  constructor(private userService: UserService, private router: Router){}

  async onSubmit(data: any){
    const user = {
      "username": data.username,
      "password": data.password
    }
    this.userService.login(user).subscribe((response) => {
      if(response.status){
        this.router.navigate([''])
      }
      else{
        this.errorMessage = response.message;
        this.showErrorMessageForDuration(5000);
      }
    });
  }

  showErrorMessageForDuration(duration: number) {
    this.showError = true;
    timer(duration).subscribe(() => {
      this.showError = false;
    });
  }
}
