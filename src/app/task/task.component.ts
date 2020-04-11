import { Component, OnInit, Input, Inject } from '@angular/core';
import { Task } from 'src/models/task.model';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.less']
})
export class TaskComponent implements OnInit {
  @Input() task: Task;

  constructor() { }

  ngOnInit(): void {
  }

  deleteTask(): void {
    console.log('Delete task', this.task);
  }

}