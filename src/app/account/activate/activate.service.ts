import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApplicationConfigService } from 'src/app/core/config/application-config.service';
const baseUrl = 'http://localhost:8080';
const API_URL = '/api';

@Injectable({ providedIn: 'root' })
export class ActivateService {
  constructor(private http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  get(key: string): Observable<{}> {
    return this.http.get(this.applicationConfigService.getEndpointFor(baseUrl + API_URL + "/activate"), {
      params: new HttpParams().set('key', key),
    });
  }
}
