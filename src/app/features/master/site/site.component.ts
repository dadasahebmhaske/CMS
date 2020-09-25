import { Component, OnInit, OnDestroy } from '@angular/core';
import { DatashareService } from '../../../core/custom-services/datashare.service';
import { AppComponent } from '../../../app.component';

import { AppService } from '@app/core/custom-services/app.service';
import { AllmasterService } from '../allmaster.service';
@Component({
  selector: 'sa-site',
  templateUrl: './site.component.html',
  styleUrls: ['./site.component.css']
})
export class SiteComponent implements OnInit, OnDestroy {
      public empInfo: any;
      public site: any = {RoleCode:''};
      public loaderbtn: boolean = true;
      public EnggData:any=[];GMData:any=[];
      constructor(private appService: AppService, private datashare: DatashareService,private allmasterService:AllmasterService) { }
      ngOnInit() {
        this.datashare.GetSharedData.subscribe(data => this.site = data == null ? { IsMainSite:'N',IsActive: 'Y',GeneralManagerId:'',FirstEngineerId:'',SecondEngineerId:'' } : data);
        this.appService.getAppData().subscribe(data => { this.empInfo = data });
        this.getAllonload();
      }
      public getAllonload(){
        this.allmasterService.getEmpByRole(3).subscribe((resData: any) => {
          if (resData.StatusCode != 0) {
            this.EnggData = resData.Data;
          }
          else { this.EnggData = []; AppComponent.SmartAlert.Errmsg(resData.Message); }
        });
        this.allmasterService.getEmpByRole(1).subscribe((resDat: any) => {
          if (resDat.StatusCode != 0) {
            this.GMData = resDat.Data;
          }
          else { this.GMData = []; AppComponent.SmartAlert.Errmsg(resDat.Message); }
        });
      }
      public onSubmit() {
        this.loaderbtn = false;
        this.site.Flag = this.site.SiteId == null ? 'IN' : 'UP';
        this.site.UserCode = this.empInfo.EmpId;
        this.site.SiteId = this.site.SiteId == null ? '' : this.site.SiteId;
         let ciphertext = this.appService.getEncrypted(this.site);
        this.allmasterService.postsite(ciphertext).subscribe((resData: any) => {
          if (resData.StatusCode != 0) {
            AppComponent.SmartAlert.Success(resData.Message);
            AppComponent.Router.navigate(['/master/site-master']);
          }
          else { AppComponent.SmartAlert.Errmsg(resData.Message); }
        });
      }
      ngOnDestroy() {
        this.datashare.updateShareData(null);
      }
    
    }
    