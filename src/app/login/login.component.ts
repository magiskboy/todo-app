import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;

  constructor(
    private userService: UserService,
    private router: Router,
    fb: FormBuilder,
  ) {
    this.loginForm = fb.group({
      username: [''],
      password: [''],
    });
  }

  ngOnInit(): void {
  }

  public onSubmit(): void {
    if (this.loginForm.valid) {
      this.userService.loginUser(
        this.loginForm.value.username,
        this.loginForm.value.password
      ).subscribe(user => this.router.navigate(['/tasks']));
    }
  }
}
