import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApplicationConfigService } from 'src/app/core/config/application-config.service';
const baseUrl = 'http://localhost:8080';
const API_URL = '/api/account';

@Injectable({ providedIn: 'root' })
export class PasswordResetFinishService {
  constructor(private http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  save(key: string, newPassword: string): Observable<{}> {
    return this.http.post(this.applicationConfigService.getEndpointFor(baseUrl + API_URL +"/reset-password/finish"), { key, newPassword });
  }
}
