import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-task-page',
  templateUrl: './task-page.component.html',
  styleUrls: ['./task-page.component.less']
})
export class TaskPageComponent implements OnInit {
  public user: User;

  constructor(
    private userService: UserService,
    router: Router
  ) {
    userService.currentUser.subscribe(user => {
      if (user === null) {
        router.navigate(['']);
      }
      this.user = user;
    });
  }

  ngOnInit(): void {
  }

  onLogout() {
    this.userService.logoutUser();
  }

}
