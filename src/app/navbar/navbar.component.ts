import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from 'src/models/user.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.less']
})
export class NavbarComponent implements OnInit {
  public user: User;

  constructor(
    private userService: UserService,
  ) {
    userService.currentUser.subscribe(user => {
      this.user = user;
    });
  }

  ngOnInit(): void {
  }

  onLogout(): void {
    this.userService.logoutUser();
  }

}
