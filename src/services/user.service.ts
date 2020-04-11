import * as Rx from 'rxjs';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { ConfigService } from './config.service';
import { HttpService } from './http.service';
import { LocalStorageService } from './localStorage.service'


@Injectable()
export class UserService {
    public currentUser: Rx.BehaviorSubject<User> = new Rx.BehaviorSubject<User>(null);

    constructor(
        private http: HttpService,
        private configService: ConfigService,
        private localStorageService: LocalStorageService,
    ) {
        const accessToken: string = localStorageService.get('access_token');
        if (accessToken) {
            this.getUserInfo(accessToken);
        }
    }

    authorization(): Rx.Observable<any> {
        return new Rx.Observable(subscribe => {
            const accessToken: string = this.localStorageService.get('access_token');
            if (accessToken) {
                this.getUserInfo(accessToken).subscribe(
                    user => subscribe.next(user),
                    error => {
                        this.localStorageService.delete('access_token');
                        subscribe.error(new Error('Token expired'));
                    }
                );
            }
            else {
                subscribe.error(new Error('Unauthorize'));
            }
        });
    }

    setCurrentUser(newUser: User): void {
        this.currentUser.next(newUser);
    }

    loginUser(username: string, password: string): Rx.Subject<User> {
        const loginEvent = new Rx.Subject<User>();
        this.getToken(username, password).subscribe(
            data => {
                const accessToken = data['access_token'];
                this.localStorageService.set('access_token', accessToken);
                this.getUserInfo(accessToken).subscribe(
                    user => loginEvent.next(user),
                    error => loginEvent.error(error)
                );
            },
            error => loginEvent.error(error)
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
                const newUser = User.create(data)
                this.setCurrentUser(newUser);
                getUserInfoEvent.next(newUser);
            },
            error => getUserInfoEvent.error(error)
        );
        return getUserInfoEvent;
    }

    logoutUser(): Rx.Subject<any> {
        const accessToken: string = this.localStorageService.get('access_token');
        const logoutEvent: Rx.Subject<any> = new Rx.Subject<any>();
        if (accessToken) {
            const apiUrl: string = this.configService.getLogoutUrl();
            this.http.post(apiUrl, {}, {Authorization: `Bearer ${accessToken}`}).subscribe(
                data => {
                    this.localStorageService.delete('access_token');
                    this.setCurrentUser(null);
                    logoutEvent.next(data);
                },
                error => logoutEvent.error(error)
            );
        }
        return logoutEvent;
    }

    registerUser(username: string, fullname: string, password: string): Rx.Subject<User> {
        const apiUrl: string = this.configService.getRegisterUrl();
        const payload: any = {
            username, fullname, password
        }
        const registerEvent: Rx.Subject<User> = new Rx.Subject<User>();
        this.http.post(apiUrl, payload).subscribe(
            data => {
                const newUser = User.create({...data, username, fullname});
                registerEvent.next(newUser);
            },
            error => registerEvent.error(error)
        );
        return registerEvent;
    }
}