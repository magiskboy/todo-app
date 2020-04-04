import { Injectable, Inject } from '@angular/core';

@Injectable()
export class ConfigService {
    server: string = 'http://localhost:8000';

    getLoginUrl(): string {
        return `${this.server}/v1/login`;
    }

    getUserInfoUrl(): string {
        return `${this.server}/v1/users/info`;
    }

    getLogoutUrl(): string {
        return `${this.server}/v1/logout`;
    }

    getRegisterUrl(): string {
        return `${this.server}/v1/users`;
    }
}