import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment.prod";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private readonly baseUrl: string = `${environment.BASE_API}/api/v1`;

  constructor(
     private httpClient: HttpClient
      ) {}


  public getAllConsultantById(id:any): Observable<any> {
    return this.httpClient.get<any[]>(`${this.baseUrl}/consultants/consultant/${id}`);
  }
  public saveProjectProgress(payload:any): Observable<any> {
    return this.httpClient.post<any[]>(`${this.baseUrl}/project-progress-report`,payload);
  }
  public updateConsultant(payload:any, id:any): Observable<any> {
    return this.httpClient.put<any[]>(`${this.baseUrl}/project-package/update/${id}`,payload);
  }

  public getAllGrievanceByReportId(id:any): Observable<any> {
    return this.httpClient.get<any[]>(`${this.baseUrl}/grievance/report-id/${id}`);
  }
  public getAllGrievanceStatus(): Observable<any> {
    return this.httpClient.get<any[]>(`${this.baseUrl}/grievance/statuses`);
  }
  public getAllGrievanceCategories(): Observable<any> {
    return this.httpClient.get<any[]>(`${this.baseUrl}/grievance/categories`);
  }
  public getAllGrievanceById(id:any): Observable<any> {
    return this.httpClient.get<any[]>(`${this.baseUrl}/grievance/sub-project-id/${id}`);
  }
  public saveGrievance(payload:any): Observable<any> {
    return this.httpClient.post<any[]>(`${this.baseUrl}/grievance`,payload);
  }
  public updateGrievance(payload:any, id:any): Observable<any> {
    return this.httpClient.put<any[]>(`${this.baseUrl}/project-package/update/${id}`,payload);
  }

}