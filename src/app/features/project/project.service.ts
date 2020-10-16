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
  public getVendorContractor(CompanyTypeId) {
    return this.httpClient.get<any>(`${AppComponent.BaseUrl}Master/GetMasterRecords?MasterCode=106&StartDate=&EndDate=&UserCode=&CompanyTypeId=${CompanyTypeId}&IsActive=Y`);
  }
  public getTransDetails(TranType, TranNo) {
    return this.httpClient.get<any>(`${AppComponent.BaseUrl}CMS/GetExistingTransactionData?TranNo=${TranNo}&TranType=${TranType}&TranSubType=1&IsActive=Y`);
  }
  public getIndentProjectExecutiveAndMaterial(TranNo,ProjectId) {
    return this.httpClient.get<any>(`${AppComponent.BaseUrl}CMS/GetDataForTransactions?TranNo=${TranNo}&TranType=102&TranSubType=1&Id=${ProjectId}&TypeId=&MainTypeId=&IsActive=Y`);
  }
  public getProjectExecutiveIndentMaterial(TranNo,ProjectId,RefTranNo) {
    return this.httpClient.get<any>(`${AppComponent.BaseUrl}CMS/GetDataForTransactions?TranNo=${TranNo}&RefTranNo=${RefTranNo}&TranType=103&TranSubType=1&Id=${ProjectId}&TypeId=&MainTypeId=&IsActive=Y`);
  }
  public getProjectVendorPO(TranNo,ProjectId,RefTranNo) {
    return this.httpClient.get<any>(`${AppComponent.BaseUrl}CMS/GetDataForTransactions?TranNo=${TranNo}&RefTranNo=${RefTranNo}&TranType=104&TranSubType=1&Id=${ProjectId}&TypeId=&MainTypeId=&IsActive=Y`);
  }
  public getProjectExecutiveGRNMaterial(TranNo,ProjectId,RefTranNo) {
    return this.httpClient.get<any>(`${AppComponent.BaseUrl}CMS/GetDataForTransactions?TranNo=${TranNo}&RefTranNo=${RefTranNo}&TranType=107&TranSubType=1&Id=${ProjectId}&TypeId=&MainTypeId=&IsActive=Y`);
  }

  public getGRNDeatils(TranNo,ProjectId,RefTranNo) {
    return this.httpClient.get<any>(`${AppComponent.BaseUrl}CMS/GetDataForTransactions?TranNo=${TranNo}&RefTranNo=${RefTranNo}&TranType=105&TranSubType=1&Id=${ProjectId}&TypeId=&MainTypeId=&IsActive=Y`);

  }
  public getInvoiceDeatils(TranNo,ProjectId,RefTranNo) {
    return this.httpClient.get<any>(`${AppComponent.BaseUrl}CMS/GetDataForTransactions?TranNo=${TranNo}&RefTranNo=${RefTranNo}&TranType=106&TranSubType=1&Id=${ProjectId}&TypeId=&MainTypeId=&IsActive=Y`);
  }
  public getTransactionlist(TranType,filter) {
    return this.httpClient.get<any>(`${AppComponent.BaseUrl}CMS/GetTransactionList?TranType=${TranType}&TranSubType=1&FromDate=${filter.StartDate}&ToDate=${filter.EndDate}&UserCode=101&IsActive=Y`);
  }
  public getDeleteTransaction(TranNo,TranType) {
    return this.httpClient.get<any>(`${AppComponent.BaseUrl}CMS/GetDeleteTransactionData?TranNo=${TranNo}&TranType=${TranType}&TranSubType=1&IsActive=Y`);
  }
  public getApprove(TranNo,TranType) {
    return this.httpClient.get<any>(`${AppComponent.BaseUrl}CMS/GetApproveTransaction?TranNo=${TranNo}&TranType=${TranType}&TranSubType=1&IsActive=Y`);
  }
  public getClose(TranNo,TranType) {
    return this.httpClient.get<any>(`${AppComponent.BaseUrl}CMS/GetCloseTransaction?TranNo=${TranNo}&TranType=${TranType}&TranSubType=2&IsActive=Y`);
  }

  public calculateTotal(project, MaterialArray) {
    project.TotProjectCost = 0;
    if (MaterialArray.length != 0)
      for (let i = 0; i < MaterialArray.length; i++) {

        project.TotProjectCost = parseFloat(project.TotProjectCost) + parseFloat(MaterialArray[i].Amount);
      }
    return project;
  }


  public calculatePOTotal(project, MaterialArray) {
    project.TotalAmtCost=0
    project.TotProjectCost = 0;project.TotIGSTCost=0;project.TotCGSTCost=0;project.TotSGSTCost=0;
    if (MaterialArray.length != 0)
      for (let i = 0; i < MaterialArray.length; i++) {
        project.TotalAmtCost = parseFloat(project.TotalAmtCost) + parseFloat(MaterialArray[i].Amount);
        project.TotIGSTCost = parseFloat(project.TotIGSTCost) + parseFloat(MaterialArray[i].IGSTAmount);
        project.TotCGSTCost = parseFloat(project.TotCGSTCost) + parseFloat(MaterialArray[i].CGSTAmount);
        project.TotSGSTCost = parseFloat(project.TotSGSTCost) + parseFloat(MaterialArray[i].SGSTAmount);
        project.TotProjectCost = parseFloat(project.TotProjectCost) + parseFloat(MaterialArray[i].TotalAmount);
      }
    return project;
  }

}


