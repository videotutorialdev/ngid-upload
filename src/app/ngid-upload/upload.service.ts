import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class UploadService {
    constructor(private httpClient: HttpClient) {}

    upload(stringUrl: string, formData: FormData): Observable<HttpEvent<any>> {
        const request = new HttpRequest('POST', stringUrl, formData, {
            reportProgress: true,
            responseType: 'json'
        });
        return this.httpClient.request(request);
    }
}