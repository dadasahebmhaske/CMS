import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {AppComponent} from '../../../app/app.component';
//import {AppComponent} from '../../../app.component';
@Injectable()
export class AllmasterService {
  constructor(private httpClient:HttpClient) { }
public postdesig(data:any){
    return this.httpClient.post<any>(`${AppComponent.BaseUrl}Master/ManageDesignation`,{data:data},AppComponent.httpOptions);            
}
public postdept(data:any){
    return this.httpClient.post<any>(`${AppComponent.BaseUrl}Master/ManageDepartment`,{data:data},AppComponent.httpOptions);            
}
public postEmployeeDetails(data:any) {
  return this.httpClient.post<any>(`${AppComponent.BaseUrl}Master/ManageEmployee`,{data:data},AppComponent.httpOptions);            
  }
public postsite(data:any){
  return this.httpClient.post<any>(`${AppComponent.BaseUrl}Master/ManageSite`,{data:data},AppComponent.httpOptions);            
}
public postCompanyType(data:any){
  return this.httpClient.post<any>(`${AppComponent.BaseUrl}Master/ManageTypes`,{data:data},AppComponent.httpOptions);            
}
public postcompany(data:any){
  return this.httpClient.post<any>(`${AppComponent.BaseUrl}Master/ManageCompany`,{data:data},AppComponent.httpOptions);            
}
public postProject(data:any){
  return this.httpClient.post<any>(`${AppComponent.BaseUrl}Master/ManageProject`,{data:data},AppComponent.httpOptions);            
}


public getDesignation(){
    return this.httpClient.get<any>(`${AppComponent.BaseUrl}Master/GetMasterRecords?MasterCode=102&StartDate=&EndDate=&UserCode=&IsActive=Y`);
  }
public getDepartment(){
    return this.httpClient.get<any>(`${AppComponent.BaseUrl}Master/GetMasterRecords?MasterCode=101&StartDate=&EndDate=&UserCode=&IsActive=Y`);
  }
  public getEmployees(){
    return this.httpClient.get<any>(`${AppComponent.BaseUrl}Master/GetMasterRecords?MasterCode=103&StartDate=&EndDate=&UserCode=&IsActive=Y`);
  }
public getEmpByRole(DesigId){
  return this.httpClient.get<any>(`${AppComponent.BaseUrl}Master/GetRelyingData?MasterCode=103&DesigId=${DesigId}&IsActive=Y`);
}
public getSite(){
  return this.httpClient.get<any>(`${AppComponent.BaseUrl}Master/GetMasterRecords?MasterCode=104&StartDate=&EndDate=&UserCode=&IsActive=Y`);
}
public getCompanyType(){
  return this.httpClient.get<any>(`${AppComponent.BaseUrl}Master/GetRelyingData?MasterCode=107&MainTypeId=1&StartDate=&EndDate=&UserCode=&IsActive=Y`);
}
public getCompany(){
  return this.httpClient.get<any>(`${AppComponent.BaseUrl}Master/GetMasterRecords?MasterCode=106&StartDate=&EndDate=&UserCode=&IsActive=Y`);
}
public getProject(){
  return this.httpClient.get<any>(`${AppComponent.BaseUrl}Master/GetMasterRecords?MasterCode=105&StartDate=&EndDate=&UserCode=&IsActive=Y`);
}
public getType(id){
  return this.httpClient.get<any>(`${AppComponent.BaseUrl}Master/GetRelyingData?MasterCode=107&MainTypeId=${id}&StartDate=&EndDate=&UserCode=&IsActive=Y`);
}
  // public getGodownDetails(){
  //   return this.httpClient.get<any>(`${AppComponent.BaseUrl}Master/GetRelyingData?MasterCode=GDWN&IsActive='Y'`);
  // }
  // public getGodownType(){
  //   return this.httpClient.get<any>(`${AppComponent.BaseUrl}Master/GetMasterRecords?MasterCode=GDWN&IsActive=Y`);
  // }
}
