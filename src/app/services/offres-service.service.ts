import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { createRequestOption } from '../core/request/request-util';
import { Pagination } from '../core/request/request.model';
import { Offre } from './offres';

@Injectable({
  providedIn: 'root'
})
export class OffresServiceService {
  private baseUrl = 'http://localhost:8080/a';
  constructor(private http: HttpClient) { }

  getOffres(id: string): Observable<Offre> {
    return this.http.get<Offre>(`${this.baseUrl}/offres/${id}`);
  }
  getArchived(id: string): Observable<Offre> {
    return this.http.get<Offre>(`${this.baseUrl}/offres/activate/${id}`);
  }

  deleteOffre(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/offres/${id}`);
  }
  
  getOffresListArchives(size, page): Observable<any> {
    return this.http.get(`${this.baseUrl}/offr/archives?size=${size}&page=${page}`);
  }

  getOffresList(size, page): Observable<any> {
    return this.http.get(`${this.baseUrl}/offres?size=${size}&page=${page}`);
  }
  getOffresListNotArchives(size, page): Observable<any> {
    return this.http.get(`${this.baseUrl}/offres/notarchives?size=${size}&page=${page}`);
  }
 getOffresGoogle(text: string): Observable<any> {
 
    return this.http.get(`${this.baseUrl}/offrs/${text}` );
  }
 getOffresAll():Observable<any>{
  return this.http.get(`${this.baseUrl}/offre`);

 }
 
 getOffresUser(): Observable<any> {
  return this.http.get(`${this.baseUrl}/offresuser`);
}
}
