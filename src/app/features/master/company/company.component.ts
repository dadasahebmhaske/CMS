import { Component, OnInit, OnDestroy } from '@angular/core';
import { DatashareService } from '../../../core/custom-services/datashare.service';
import { AppComponent } from '../../../app.component';
import { AppService } from '@app/core/custom-services/app.service';
import { AllmasterService } from '../allmaster.service';
@Component({
  selector: 'sa-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit, OnDestroy {
          public empInfo: any;
          public company: any = {RoleCode:''};
          public loaderbtn: boolean = true;
          public CompanyTypeData:any=[];
          constructor(private appService: AppService, private datashare: DatashareService,private allmasterService:AllmasterService) { }
          ngOnInit() {
            this.datashare.GetSharedData.subscribe(data => this.company = data == null ? { IsActive: 'Y',CompanyTypeId:'' } : data);
            this.appService.getAppData().subscribe(data => { this.empInfo = data });
            this.allOnloadMethods(); 
          }
          allOnloadMethods() {
            this.allmasterService.getCompanyType().subscribe((resD: any) => {
              if (resD.StatusCode != 0) {
                this.CompanyTypeData = resD.Data;
              }
              else { this.CompanyTypeData = []; AppComponent.SmartAlert.Errmsg(resD.Message); }
            });}
          public onSubmit() {
            this.loaderbtn = false;
            this.company.Flag = this.company.CompanyId == null ? 'IN' : 'UP';
            this.company.UserCode = this.empInfo.EmpId;
            this.company.CompanyId = this.company.CompanyId == null ? '' : this.company.CompanyId;
            let ciphertext = this.appService.getEncrypted(this.company);
            this.allmasterService.post('ManageCompany',ciphertext).subscribe((resData: any) => {
              this.loaderbtn = true;
              if (resData.StatusCode != 0) {
                AppComponent.SmartAlert.Success(resData.Message);
                AppComponent.Router.navigate(['/master/company-master']);
              }
              else { AppComponent.SmartAlert.Errmsg(resData.Message); }
            });
          }
          ngOnDestroy() {
            this.datashare.updateShareData(null);
          }
        
        }
        