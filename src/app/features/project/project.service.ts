import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppComponent } from '../../../app/app.component';
@Injectable()
export class ProjectService {
  constructor(private httpClient: HttpClient) { }
  public filterData(data, DocTypId, para) {
    return data.filter(object => {
      return object[para] == DocTypId;
    });
  }
  public post(uri, data: any) {
    return this.httpClient.post<any>(`${AppComponent.BaseUrl}CMS/${uri}`, { data: data }, AppComponent.httpOptions);
  }
//   public getmasterData(MasterCode) {
//     return this.httpClient.get<any>(`${AppComponent.BaseUrl}Master/GetMasterRecords?MasterCode=${MasterCode}&StartDate=&EndDate=&UserCode=&IsActive=Y`);
//   }
public getProject(SiteId) {
    return this.httpClient.get<any>(`${AppComponent.BaseUrl}Master/GetRelyingData?MasterCode=105&SiteId=${SiteId}&StartDate=&EndDate=&UserCode=&IsActive=Y`);
  }
  public getAMType(MainTypeId) {
    return this.httpClient.get<any>(`${AppComponent.BaseUrl}Master/GetRelyingData?MasterCode=107&MainTypeId=${MainTypeId}&StartDate=&EndDate=&UserCode=&IsActive=Y`);
  }
  public getAM(MainTypeId) {
    return this.httpClient.get<any>(`${AppComponent.BaseUrl}CMS/GetDataForTransactions?TranNo=&TranType=101&TranSubType=1&Id=&TypeId=&MainTypeId=${MainTypeId}&IsActive=Y`);
  }
  public getProjectBudgetlist() {
    return this.httpClient.get<any>(`${AppComponent.BaseUrl}CMS/GetTransactionList?TranType=101&TranSubType=1&FromDate&ToDate&UserCode=101&IsActive=Y`);
  }
  public getProjectBudgetTrans(TranNo) {
    return this.httpClient.get<any>(`${AppComponent.BaseUrl}CMS/GetExistingTransactionData?TranNo=${TranNo}&TranType=101&TranSubType=1&IsActive=Y`);
  }
  //   public getEmpByRole(DesigId) {
//     return this.httpClient.get<any>(`${AppComponent.BaseUrl}Master/GetRelyingData?MasterCode=103&DesigId=${DesigId}&IsActive=Y`);
//   }
//   public getType(id) {
//     return this.httpClient.get<any>(`${AppComponent.BaseUrl}Master/GetRelyingData?MasterCode=107&MainTypeId=${id}&StartDate=&EndDate=&UserCode=&IsActive=Y`);
//   }
//   public getCompanyType() {
//     return this.httpClient.get<any>(`${AppComponent.BaseUrl}Master/GetRelyingData?MasterCode=107&MainTypeId=1&StartDate=&EndDate=&UserCode=&IsActive=Y`);
//   }


public calculateTotal(project, MaterialArray) {
 project.TotProjectCost = 0;
  if (MaterialArray.length != 0)
      for (let i = 0; i < MaterialArray.length; i++) {
         
          project.TotProjectCost = parseFloat(project.TotProjectCost) + parseFloat(MaterialArray[i].Amount);
      }
  return project;
}
}


