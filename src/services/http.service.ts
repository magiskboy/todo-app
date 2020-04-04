import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import * as Rx from 'rxjs';


@Injectable({
    providedIn: HttpClientModule
})
export class HttpService {
    defaultHeaders: object = {
        'Content-Type': 'application/json'
    }

    constructor(private http: HttpClient) {}

    get(url: string, headers?: object): Rx.Observable<object> {
        const mergedHeaders = {...this.defaultHeaders, ...headers};
        return this.http.get(url, {
            headers: new HttpHeaders(mergedHeaders)
        });
    }

    post(url: string, body: any, headers?: object): Rx.Observable<object> {
        const mergedHeaders = {...this.defaultHeaders, ...headers};
        return this.http.post(url, body, {
            headers: new HttpHeaders(mergedHeaders)
        });
    }

    put(url: string, body: any, headers?: object): Rx.Observable<object> {
        const mergedHeaders = {...this.defaultHeaders, ...headers};
        return this.http.put(url, body, {
            headers: new HttpHeaders(mergedHeaders)
        });
    }

    patch(url: string, body: any, headers?: object): Rx.Observable<object> {
        const mergedHeaders = {...this.defaultHeaders, ...headers};
        return this.http.patch(url, body, {
            headers: new HttpHeaders(mergedHeaders)
        });
    }

    delete(url: string, headers?: object): Rx.Observable<object> {
        const mergedHeaders = {...this.defaultHeaders, ...headers};
        return this.http.delete(url, {
            headers: new HttpHeaders(mergedHeaders)
        });
    }
}