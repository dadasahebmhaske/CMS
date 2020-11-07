import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppComponent } from '../../../app/app.component';
@Injectable()
export class SettingService {
  constructor(private httpClient: HttpClient) { }
  public filterData(data, DocTypId, para) {
    return data.filter(object => {
      return object[para] == DocTypId;
    });
  }

  public post(uri, data: any) {
    return this.httpClient.post<any>(`${AppComponent.BaseUrl}${uri}`, { data: data }, AppComponent.httpOptions);
  }
  public getmasterData(MasterCode, IsActive) {
    return this.httpClient.get<any>(`${AppComponent.BaseUrl}Master/GetMasterRecords?MasterCode=${MasterCode}&StartDate=&EndDate=&UserCode=&IsActive=${IsActive}`);
  }
  public getMainMenuL1(IsActive) { return this.getmasterData(116, IsActive); }
  public getSubMenuL2(IsActive) { return this.getmasterData(117, IsActive); }
  public getSubMenuL3(IsActive) { return this.getmasterData(118, IsActive); }
  public getMenuAllocation(DesigId) {
    return this.httpClient.get<any>(`${AppComponent.BaseUrl}Settings/GetMenuAssignedRoles?AppId=1001&DesigId=${DesigId}&IsActive=Y`);
  }
  public getDesignationForMenu(DesigId) {
    return this.httpClient.get<any>(`${AppComponent.BaseUrl}Settings/GetDesigForMenuAllocation?DesigId=${DesigId}&IsActive=Y`);
  }
  // public getMenuAllMenu(DesigId) { 
  //   return this.httpClient.get<any>(`${AppComponent.BaseUrl}Settings/GetAllocatedMenus?AppId=1001&DesigId=${DesigId}&IsActive=Y`);
  // }

}


