import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {AppComponent} from '../../../app/app.component';
//import {AppComponent} from '../../../app.component';
@Injectable()
export class AllmasterService {
  constructor(private httpClient:HttpClient) { }
public postdesig(data:any){
    return this.httpClient.post<any>(`${AppComponent.BaseUrl}Operational/ManageEmployee`,{data:data},AppComponent.httpOptions);            
}
public postdept(data:any){
    return this.httpClient.post<any>(`${AppComponent.BaseUrl}ManageDepartment`,{data:data},AppComponent.httpOptions);            
}

public getDesignation(){
    return this.httpClient.get<any>(`${AppComponent.BaseUrl}Master/GetRelyingData?MasterCode=GDWN&IsActive='Y'`);
  }
public getDepartment(){
    return this.httpClient.get<any>(`${AppComponent.BaseUrl}Master/GetRelyingData?MasterCode=GDWN&IsActive='Y'`);
  }



 public postEmployeeDetails(data:any) {
  return this.httpClient.post<any>(`${AppComponent.BaseUrl}Operational/ManageEmployee`,{data:data},AppComponent.httpOptions);            
  }
  public getGodownDetails(){
    return this.httpClient.get<any>(`${AppComponent.BaseUrl}Master/GetRelyingData?MasterCode=GDWN&IsActive='Y'`);
  }
  public getGodownType(){
    return this.httpClient.get<any>(`${AppComponent.BaseUrl}Master/GetMasterRecords?MasterCode=GDWN&IsActive=Y`);
  }
}
