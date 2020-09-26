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
public postUMO(data:any){
  return this.httpClient.post<any>(`${AppComponent.BaseUrl}Master/ManageUOM`,{data:data},AppComponent.httpOptions);            
}
public postMaterial(data:any){
  return this.httpClient.post<any>(`${AppComponent.BaseUrl}Master/ManageMaterial`,{data:data},AppComponent.httpOptions);            
}
public post(uri,data:any){
  return this.httpClient.post<any>(`${AppComponent.BaseUrl}Master/${uri}`,{data:data},AppComponent.httpOptions);            
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
public getUOM(){
  return this.httpClient.get<any>(`${AppComponent.BaseUrl}Master/GetMasterRecords?MasterCode=114&StartDate=&EndDate=&UserCode=&IsActive=Y`);
}
public getMaterial(){
  return this.httpClient.get<any>(`${AppComponent.BaseUrl}Master/GetMasterRecords?MasterCode=108&StartDate=&EndDate=&UserCode=&IsActive=Y`);
}
public getlabourWork(){
  return this.httpClient.get<any>(`${AppComponent.BaseUrl}Master/GetMasterRecords?MasterCode=109&StartDate=&EndDate=&UserCode=&IsActive=Y`);
}
public getOtherExp()
{
  return this.httpClient.get<any>(`${AppComponent.BaseUrl}Master/GetMasterRecords?MasterCode=110&StartDate=&EndDate=&UserCode=&IsActive=Y`);
}
public getPayTerm()
{
  return this.httpClient.get<any>(`${AppComponent.BaseUrl}Master/GetMasterRecords?MasterCode=111&StartDate=&EndDate=&UserCode=&IsActive=Y`);
}
public getDeliveryTerm()
{
  return this.httpClient.get<any>(`${AppComponent.BaseUrl}Master/GetMasterRecords?MasterCode=112&StartDate=&EndDate=&UserCode=&IsActive=Y`);
}
public gettatxation()
{
  return this.httpClient.get<any>(`${AppComponent.BaseUrl}Master/GetMasterRecords?MasterCode=113&StartDate=&EndDate=&UserCode=&IsActive=Y`);
}
public getLabour()
{
  return this.httpClient.get<any>(`${AppComponent.BaseUrl}Master/GetMasterRecords?MasterCode=115&StartDate=&EndDate=&UserCode=&IsActive=Y`);
}


}
