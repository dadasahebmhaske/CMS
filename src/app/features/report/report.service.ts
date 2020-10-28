import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppComponent } from '../../../app/app.component';
@Injectable()
export class ReportService {
  constructor(private httpClient: HttpClient) { }
  public filterData(data, DocTypId, para) {
    return data.filter(object => {
      return object[para] == DocTypId;
    });
  }
  
  public GetProjectBudgetStatus(deliverFilter) {
    return this.httpClient.get<any>(`${AppComponent.BaseUrl}CMS/Reports/GetProjectBudgetStatus?SiteId=${deliverFilter.SiteId}&ProjectId=${deliverFilter.ProjectId}&IsActive=Y`);
  }
  public GetIndentStatus(deliverFilter) {
    return this.httpClient.get<any>(`${AppComponent.BaseUrl}CMS/Reports/GetIndentStatus?SiteId=${deliverFilter.SiteId}&ProjectId=${deliverFilter.ProjectId}&StartDate=${deliverFilter.StartDate}&EndDate=${deliverFilter.EndDate}&IsActive=Y`);
  }
  public GetPOStatus(deliverFilter) {
    return this.httpClient.get<any>(`${AppComponent.BaseUrl}CMS/Reports/GetPurchaseOrderStatus?SiteId=${deliverFilter.SiteId}&ProjectId=${deliverFilter.ProjectId}&PartyId=${deliverFilter.PartyId}&Status=${deliverFilter.Status}&StartDate=${deliverFilter.StartDate}&EndDate=${deliverFilter.EndDate}&IsActive=Y`);
    
  }

  public GetInvoiceAndPaymentStatus(deliverFilter) {
    return this.httpClient.get<any>(`${AppComponent.BaseUrl}CMS/Reports/GetInvoicePaymentStatus?SiteId=${deliverFilter.SiteId}&ProjectId=${deliverFilter.ProjectId}&Type=${deliverFilter.Type}&StartDate=${deliverFilter.StartDate}&EndDate=${deliverFilter.EndDate}&PartyId=${deliverFilter.PartyId}&IsActive=Y`);
    
  }
  public GetMaterialStatus(deliverFilter) {
    return this.httpClient.get<any>(`${AppComponent.BaseUrl}CMS/Reports/GetMaterialStatus?SiteId=${deliverFilter.SiteId}&ProjectId=${deliverFilter.ProjectId}&StartDate=${deliverFilter.StartDate}&EndDate=${deliverFilter.EndDate}&IsActive=Y`);
    
  }

 

}


