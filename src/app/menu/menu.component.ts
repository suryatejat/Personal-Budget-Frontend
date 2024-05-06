import { Component } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'pb-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  constructor(public userService: UserService){}

  logout(): void{
    this.userService.logout();
  }
}
