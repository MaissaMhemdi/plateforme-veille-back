import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApplicationConfigService } from 'src/app/core/config/application-config.service';
import { Registration } from './register.model';


const baseUrl = 'http://localhost:8080';
const API_URL = '/api';
@Injectable({
  providedIn: 'root'
})

export class RegisterService {
  constructor(private http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  save(registration: Registration): Observable<{}> {
    //return this.http.post(this.applicationConfigService.getEndpointFor('api/register'), registration);
    return this.http.post(baseUrl + API_URL + "/register", registration);
  }
}
