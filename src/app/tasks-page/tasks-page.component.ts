import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from 'src/models/task.model';
import { UserService } from 'src/services/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-tasks-page',
  templateUrl: './tasks-page.component.html',
  styleUrls: ['./tasks-page.component.less']
})
export class TasksPageComponent implements OnInit {
  public tasks: Task[] = new Array<Task>();

  constructor(
    taskService: TaskService,
    userService: UserService,
    router: Router,
  ) {
    userService.authorization().subscribe(
      user => {
        taskService.getTaskList().subscribe(tasks => {
          this.tasks = tasks;
        });
      },
      error => router.navigate([''])
    );
  }

  ngOnInit(): void {
  }
}
