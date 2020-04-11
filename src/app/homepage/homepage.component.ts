import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.less']
})
export class HomepageComponent implements OnInit {
  constructor(
    userService: UserService,
    router: Router, 
  ) {
    userService.authorization().subscribe(
      user => router.navigate(['tasks']),
      error => console.error(error)
    );
  }

  ngOnInit(): void {}

}
