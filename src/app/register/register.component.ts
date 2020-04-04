import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less']
})
export class RegisterComponent implements OnInit {
  public registerForm: FormGroup;

  constructor(
    fb: FormBuilder,
    private userService: UserService,
    private router: Router,
  ) {
    this.registerForm = fb.group({
      username: [''],
      fullname: [''],
      password: [''],
      retypePassword: ['']
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const value: any = this.registerForm.value;
      if (value.password === value.retypePassword) {
        this.userService.registerUser(
          value.username, value.fullname, value.password
        ).subscribe(
          data => this.userService.loginUser(value.username, value.password)
        );
      }
    }
  }
}
