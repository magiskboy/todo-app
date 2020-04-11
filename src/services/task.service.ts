import { Injectable } from '@angular/core';
import * as Rx from 'rxjs';
import * as ops from 'rxjs/operators';
import { ConfigService } from './config.service';
import { HttpService } from './http.service';
import { UserService } from './user.service';
import { LocalStorageService } from './localStorage.service';
import { Task } from 'src/models/task.model';


@Injectable()
export class TaskService {
    public newTask: Rx.Subject<Task>

    constructor(
        private http: HttpService,
        private userService: UserService,
        private localStorageService: LocalStorageService,
        private configService: ConfigService,
    ) {
        this.newTask = new Rx.Subject<Task>();
    }

    addTask(newTask: Task): void {
        const accessToken: string = this.localStorageService.get('access_token');
        const apiUrl: string = this.configService.createTaskUrl();
        this.http.post(apiUrl, newTask, {Authorization: `Bearer ${accessToken}`}).subscribe(data => {
            newTask.id = data['id'];
            this.newTask.next(newTask);
        });
    }

    getTaskList(): Rx.Observable<Task[]> {
        const accessToken: string = this.localStorageService.get('access_token');
        const apiUrl: string = this.configService.getTaskListUrl();
        // this.http.get(apiUrl, {Authorization: `Bearer ${accessToken}`}).subscribe((data: any[]) => {
        //     let tasks: Task[] = new Array<Task>();
        //     for (let el of data) {
        //         tasks.push(Task.create(el));
        //     }
        //     tasksEvent.next(tasks);
        // });
        return this.http.get(apiUrl, {Authorization: `Bearer ${accessToken}`}).pipe(
            ops.map((value: Array<object>, index) => {
                let tasks: Task[] = new Array<Task>();
                for (let el of value) {
                    tasks.push(Task.create(el));
                }
                return tasks;
            })
        );
    }
}