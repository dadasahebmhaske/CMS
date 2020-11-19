import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppComponent } from '../../../app/app.component';
@Injectable()
export class AllmasterService {
  constructor(private httpClient: HttpClient) { }
  public post(uri, data: any) {
    return this.httpClient.post<any>(`${AppComponent.BaseUrl}Master/${uri}`, { data: data }, AppComponent.httpOptions);
  }
  public getmasterData(MasterCode,IsActive) {
    return this.httpClient.get<any>(`${AppComponent.BaseUrl}Master/GetMasterRecords?MasterCode=${MasterCode}&StartDate=&EndDate=&UserCode=&IsActive=${IsActive}`);
  }
  public getDepartment(IsActive) {    return this.getmasterData(101,IsActive);  }
  public getDesignation(IsActive) {    return this.getmasterData(102,IsActive); }
  public getEmployees(IsActive) {    return this.getmasterData(103,IsActive);  }
  public getSite(IsActive) {    return this.getmasterData(104,IsActive); }
  public getProject(IsActive) {    return this.getmasterData(105,IsActive); }
  public getCompany(IsActive) {    return this.getmasterData(106,IsActive); }
  public getMaterial(IsActive) {    return this.getmasterData(108,IsActive); }
  public getlabourWork(IsActive) {    return this.getmasterData(109,IsActive); }
  public getOtherExp(IsActive) {    return this.getmasterData(110,IsActive); }
  public getPayTerm(IsActive) {   return this.getmasterData(111,IsActive); } 
  public getDeliveryTerm(IsActive) {    return this.getmasterData(112,IsActive);}
  public gettatxation(IsActive) {   return this.getmasterData(113,IsActive);}
  public getUOM(IsActive) {    return this.getmasterData(114,IsActive);  }
  public getLabour(IsActive) {    return this.getmasterData(115,IsActive);}
  public getEmpByRole(DesigId) {
    return this.httpClient.get<any>(`${AppComponent.BaseUrl}Master/GetRelyingData?MasterCode=103&DesigId=${DesigId}&IsActive=Y`);
  }
  public getType(id) {
    return this.httpClient.get<any>(`${AppComponent.BaseUrl}Master/GetRelyingData?MasterCode=107&MainTypeId=${id}&StartDate=&EndDate=&UserCode=&IsActive`);
  }

  public getSiteData(UserCode) {
    return this.httpClient.get<any>(`${AppComponent.BaseUrl}Master/GetSitesProjects?MasterCode=104&StartDate=&EndDate=&SiteId=&UserCode=${UserCode}&IsApproved=Y&IsActive=Y`);
  }
  public getProjectData(SiteId,UserCode) {
    return this.httpClient.get<any>(`${AppComponent.BaseUrl}Master/GetSitesProjects?MasterCode=105&StartDate=&EndDate=&SiteId=${SiteId}&UserCode=${UserCode}&IsApproved=Y&IsActive=Y`);
  }

  public getCompanyType() {
    return this.httpClient.get<any>(`${AppComponent.BaseUrl}Master/GetRelyingData?MasterCode=107&MainTypeId=1&StartDate=&EndDate=&UserCode=&IsActive=Y`);
  }



}


