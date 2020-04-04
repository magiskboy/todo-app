import { Injectable, Inject } from '@angular/core';


@Injectable()
export class LocalStorageService {
    set(key: string, value: string): void {
        localStorage.setItem(key, value);
    }

    get(key: string): string {
        return localStorage.getItem(key);
    }

    delete(key: string): void {
        localStorage.removeItem(key);
    }
}