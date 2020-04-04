import * as Rx from 'rxjs';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { ConfigService } from './config.service';
import { HttpService } from './http.service';
import { LocalStorageService } from './localStorage.service'

@Injectable()
export class UserService {
    public currentUser: Rx.BehaviorSubject<User>;

    constructor(
        private http: HttpService,
        private configService: ConfigService,
        private localStorageService: LocalStorageService,
    ) {
        this.currentUser = new Rx.BehaviorSubject<User>(null);
    }

    setCurrentUser(newUser: User): void {
        this.currentUser.next(newUser);
    }

    loginUser(username: string, password: string): Rx.Subject<User> {
        const loginEvent = new Rx.Subject<User>();
        this.getToken(username, password).subscribe(
            data => {
                const access_token = data['access_token'];
                this.localStorageService.set('access_token', access_token);
                this.getUserInfo(access_token).subscribe(user => loginEvent.next(user));
            },
            response => console.error(response)
        );
        return loginEvent;
    }

    getToken(username: string, password: string): Rx.Observable<any> {
        const payload: any = JSON.stringify({
            username: username,
            password: password
        });
        const apiUrl: string = this.configService.getLoginUrl();
        return this.http.post(apiUrl, payload);
    }

    getUserInfo(accessToken: string): Rx.Subject<User> {
        const apiUrl: string = this.configService.getUserInfoUrl();
        const getUserInfoEvent = new Rx.Subject<User>();
        this.http.get(apiUrl, { Authorization: `Bearer ${accessToken}` }).subscribe(
            data => {
                const newUser = new User(
                    data['id'],
                    data['fullname'],
                    data['username'],
                    data['created_at']
                );
                this.setCurrentUser(newUser);
                getUserInfoEvent.next(newUser);
            },
            response => {
                console.error(response);
            }
        );
        return getUserInfoEvent;
    }

    logoutUser(): void {
        const accessToken: string = this.localStorageService.get('access_token');
        if (accessToken != undefined) {
            const apiUrl: string = this.configService.getLogoutUrl();
            this.http.post(apiUrl, '', {Authorization: `Bearer ${accessToken}`}).subscribe(
                data => {
                    this.localStorageService.delete('access_token');
                    this.setCurrentUser(null);
                }
            );
        }
    }

    registerUser(username: string, fullname: string, password: string): Rx.Observable<User> {
        const apiUrl: string = this.configService.getRegisterUrl();
        const payload: any = {
            username, fullname, password
        }
        console.log(payload);
        return this.http.post(apiUrl, payload);
    }
}