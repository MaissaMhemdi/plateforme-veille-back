import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApplicationConfigService } from 'src/app/core/config/application-config.service';
import { createRequestOption } from 'src/app/core/request/request-util';
import { Pagination } from 'src/app/core/request/request.model';
import { IUser } from '../dashboard-order/user-management.model';



@Injectable({
  providedIn: 'root'
})

export class UserService {
  private baseUrl = 'http://localhost:8080/api/admin/users';
  private url='http://localhost:8080/api';

  private resourceUrl = this.applicationConfigService.getEndpointFor('api/admin/users');

  constructor(private http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  create(user: IUser): Observable<IUser> {
    return this.http.post<IUser>(this.resourceUrl, user);
  }

  update(user: IUser): Observable<IUser> {
    return this.http.put<IUser>(this.baseUrl, user);
  }
  activated(user: IUser): Observable<IUser> {
    return this.http.put<IUser>(this.baseUrl +"/activated", user);
  }

  find(login: string): Observable<IUser> {
    return this.http.get<IUser>(`${this.baseUrl}/${login}`);
  }

  query(req?: Pagination): Observable<HttpResponse<IUser[]>> {
    const options = createRequestOption(req);
    return this.http.get<IUser[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(login: string): Observable<{}> {
    return this.http.delete(`${this.baseUrl}/${login}`);
  }

  usersall(size, page): Observable<any> {
    return this.http.get(`${this.baseUrl}?size=${size}&page=${page}`);
  }
  authorities(): Observable<string[]> {
    return this.http.get<string[]>(this.applicationConfigService.getEndpointFor(`${this.url}/authorities`));
  }
}