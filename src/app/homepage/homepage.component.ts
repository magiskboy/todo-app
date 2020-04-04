import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../services/localStorage.service';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.less']
})
export class HomepageComponent implements OnInit {
  constructor(
    private userService: UserService,
    private localStorageService: LocalStorageService,
    private router: Router, 
  ) {
    const accessToken: string = localStorageService.get('access_token');
    if (accessToken != undefined) {
      userService.getUserInfo(accessToken).subscribe(
        user => router.navigate(['tasks']),
        error => console.log('Login again')
      );
    }
    this.userService.currentUser.subscribe(user => {
      if (user !== null) router.navigate(['tasks']);
    });
  }

  ngOnInit(): void {}

}
