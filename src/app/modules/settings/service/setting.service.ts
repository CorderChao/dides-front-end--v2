import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment.prod";

@Injectable({
  providedIn: 'root'
})
export class SettingService {

  private readonly baseUrl: string = `${environment.BASE_API}/api/v1`;

  constructor(
     private httpClient: HttpClient
      ) {}
  // CRUD for Organizations //
   saveOrganization(payLoad: any) {
    return this.httpClient.post<any>(`${this.baseUrl}/organizations`, payLoad);
  }

   getAllOrganization(): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}/organizations`);
  }

   getOrganizationById(id: any): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}/organizations/${id}`);
  }

  updateOrganization(id:any, payload:any) {
    return this.httpClient.put<any>(`${this.baseUrl}/organizations/${id}`,payload);
  }

  deleteOrganization(id:any) {
    return this.httpClient.delete<any>(`${this.baseUrl}/organizations/${id}`);
  }

//SEtting for configuration Types

  saveCofigType(payLoad: any) {
    return this.httpClient.post<any>(`${this.baseUrl}/common-config`, payLoad);
  }

  public getCofigTypes(dataType: any): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}/common-config/${dataType}`);
  }

  getCofigType(id: string) {
    return this.httpClient.get<any>(`${this.baseUrl}/common-config/${id}`);
  }

  updateCofigType(id: string, payLoad: any) {
    return this.httpClient.put<any>(`${this.baseUrl}/common-config/${id}`,payLoad);
  }

  public deleteConfigType(id: string) {
    return this.httpClient.delete(`${this.baseUrl}/common-config/${id}`);
  }

  // CRUD for regions //
  public getAllRegions(): Observable<any> {
    return this.httpClient.get<any[]>(`${this.baseUrl}/regions`);
  }
  public saveRegion(payLoad: any): Observable<any> {
    return this.httpClient.post<any[]>(`${this.baseUrl}/regions`, payLoad);
  }
  public updateRegion(id: string, payLoad: any): Observable<any> {
    return this.httpClient.put<any[]>(`${this.baseUrl}/regions/${id}`, payLoad);
  }
  public deleteRegion(id: string) {
    return this.httpClient.delete<any>(`${this.baseUrl}/regions/${id}`);
  }

  // CRUD for councils //
  public getAllCouncils(regionId: string): Observable<any> {
    return this.httpClient.get<any[]>(`${this.baseUrl}/councils/region/code/${regionId}`);
  }
  public getAllFunders(): Observable<any> {
    return this.httpClient.get<any[]>(`${this.baseUrl}/funders/all-funders`);
  }
  public getAllFunderById(id:any): Observable<any> {
    return this.httpClient.get<any[]>(`${this.baseUrl}/funders/funder/${id}`);
  }
  public saveFunder(payload:any): Observable<any> {
    return this.httpClient.post<any[]>(`${this.baseUrl}/funders/save`,payload);
  }
  public updateFunder(payload:any, id:any): Observable<any> {
    return this.httpClient.put<any[]>(`${this.baseUrl}/sponsors/id/${id}`,payload);
  }

  public getProjects(): Observable<any> {
    return this.httpClient.get<any[]>(`${this.baseUrl}/projects/all-projects`);
  }

  public getProject(id: any): Observable<any> {
    return this.httpClient.get<any[]>(`${this.baseUrl}/projects/project/${id}`);
  }
  public getAllReports(id: any): Observable<any> {
    return this.httpClient.get<any[]>(`${this.baseUrl}/project-progress-report/project/${id}`);
  }

  public saveProject(payload:any): Observable<any> {
    return this.httpClient.post<any[]>(`${this.baseUrl}/projects/save`,payload);
  }
  public updateProject(payload:any, id:any): Observable<any> {
    return this.httpClient.put<any[]>(`${this.baseUrl}/sponsors/id/${id}`,payload);
  }
  public getAllProjectByCouncilCode(code:any): Observable<any> {
    return this.httpClient.get<any[]>(`${this.baseUrl}/projects/project/council-code/${code}`);
  }
  // public getAllPackagesByProjectCode(code:any): Observable<any> {
  //   return this.httpClient.get<any[]>(`${this.baseUrl}/grievance/sub-project-id/${id}`);
  // }
  public getAllPackages(): Observable<any> {
    return this.httpClient.get<any[]>(`${this.baseUrl}/project-package/all-projects-packages`);
  }
  public getAllPackageById(id:any): Observable<any> {
    return this.httpClient.get<any[]>(`${this.baseUrl}/project-package/project/${id}`);
  }
  public savePackage(payload:any): Observable<any> {
    return this.httpClient.post<any[]>(`${this.baseUrl}/project-package/save`,payload);
  }
  public updatePackage(payload:any, id:any): Observable<any> {
    return this.httpClient.put<any[]>(`${this.baseUrl}/project-package/update/${id}`,payload);
  }

  public getAllConsultants(): Observable<any> {
    return this.httpClient.get<any[]>(`${this.baseUrl}/consultants/all-consultants`);
  }
  public getAllConsultantById(id:any): Observable<any> {
    return this.httpClient.get<any[]>(`${this.baseUrl}/consultants/consultant/${id}`);
  }
  public saveConsultant(payload:any): Observable<any> {
    return this.httpClient.post<any[]>(`${this.baseUrl}/consultants/save`,payload);
  }
  public updateConsultant(payload:any, id:any): Observable<any> {
    return this.httpClient.put<any[]>(`${this.baseUrl}/project-package/update/${id}`,payload);
  }

  public getAllContracts(): Observable<any> {
    return this.httpClient.get<any[]>(`${this.baseUrl}/contracts/all-contracts`);
  }
  public getAllContractsById(id:any): Observable<any> {
    return this.httpClient.get<any[]>(`${this.baseUrl}/contracts/contract/${id}`);
  }
  public saveContract(payload:any): Observable<any> {
    return this.httpClient.post<any[]>(`${this.baseUrl}/contracts/save`,payload);
  }


  public getAllContractors(): Observable<any> {
    return this.httpClient.get<any[]>(`${this.baseUrl}/contractors/all-contractors`);
  }
  public getAllContractorsById(id:any): Observable<any> {
    return this.httpClient.get<any[]>(`${this.baseUrl}/contractors/contractor/${id}`);
  }
  public saveContractor(payload:any): Observable<any> {
    return this.httpClient.post<any[]>(`${this.baseUrl}/contractors/save`,payload);
  }

  public getAllContractTypes(): Observable<any> {
    return this.httpClient.get<any[]>(`${this.baseUrl}/contract-type/all-contracts-type`);
  }
  public saveContractTypes(payload:any): Observable<any> {
    return this.httpClient.post<any[]>(`${this.baseUrl}/contract-type/save`,payload);
  }

  public getAllSubProjects(): Observable<any> {
    return this.httpClient.get<any[]>(`${this.baseUrl}/sub-project/all-sub-projects`);
  }
  public getSubProjectById(id:any): Observable<any> {
    return this.httpClient.get<any[]>(`${this.baseUrl}/sub-project/project/${id}`);
  }
  public saveSubProject(payload:any): Observable<any> {
    return this.httpClient.post<any[]>(`${this.baseUrl}/sub-project/save`,payload);
  }

}