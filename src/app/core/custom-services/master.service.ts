import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppComponent } from '../../app.component';
@Injectable({
  providedIn: 'root'
})
export class MasterService {
  constructor(private httpClient: HttpClient) { }
  public getMonthsDiff(dt2, dt1) {
    if (dt2 != null && dt1 != null) {
      var diff = (new Date(dt2).getTime() - dt1.getTime()) / 1000;
      diff /= (60 * 60 * 24 * 7 * 4);
      return Math.abs(Math.round(diff));
    }
  }
  public getYearsDiff(d1, d2) {
    // if (d2 != null && d1 != null) {
    //   let date1 = new Date(d1);
    //   let date2 = new Date(d2);
    //   let yearsDiff = date2.getFullYear() - date1.getFullYear();
    //   return yearsDiff;
    // }
    if (d2 != null && d1 != null) {
      d2=new Date(d2); d1=new Date(d1);
      var diff = (d2.getTime() - d1.getTime()) / 1000;
      diff /= (60 * 60 * 24);
      var yr = Math.abs(diff / 365.25);
      var month = (diff % 365.25) / 30.30;
      yr = parseInt(`${yr}`);
      month = parseInt(`${month}`);
      if (month == 12) {
        return parseFloat(`${yr + 1}.0`);
      } else {
        return parseFloat( `${yr}.${month}`);
      }

    }
  }
  public filterData(data, DocTypId, para) {
    return data.filter(object => {
      return object[para] == DocTypId;
    });
  }
 
  public getNavMenu(RoleCode, RoleId, UserCode) {
    return this.httpClient.get<any>(`${AppComponent.BaseUrl}Settings/GetMenuAllocated?AllocationId=&AppId=&DeptId=&RoleCode=${RoleCode}&RoleId=${RoleId}&UserCode=${UserCode}&IsActive=Y&Status=&AFlag=DI`, AppComponent.httpOptions);
  }

}
