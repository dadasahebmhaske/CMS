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
  
//   public GetProjectBudgetStatus(deliverFilter) {
//     return this.httpClient.get<any>(`${AppComponent.BaseUrl}CMS/Reports/GetProjectBudgetStatus?SiteId=${deliverFilter.SiteId}&ProjectId=${deliverFilter.ProjectId}&IsActive=Y`);
//   }
 

 

}


