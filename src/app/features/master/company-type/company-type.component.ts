import { Component, OnInit, OnDestroy } from '@angular/core';
import { DatashareService } from '../../../core/custom-services/datashare.service';
import { AppComponent } from '../../../app.component';
import { AppService } from '@app/core/custom-services/app.service';
import { AllmasterService } from '../allmaster.service';

@Component({
  selector: 'sa-company-type',
  templateUrl: './company-type.component.html',
  styleUrls: ['./company-type.component.css']
})
export class CompanyTypeComponent implements OnInit, OnDestroy {
              public empInfo: any;
              public company: any = {RoleCode:''};
              public loaderbtn: boolean = true;
              constructor(private appService: AppService, private datashare: DatashareService,private allmasterService:AllmasterService) { }
              ngOnInit() {
                this.datashare.GetSharedData.subscribe(data => this.company = data == null ? { IsActive: 'Y',RoleCode:'' } : data);
                this.appService.getAppData().subscribe(data => { this.empInfo = data });
              }
              public onSubmit() {
                this.loaderbtn = false;
                this.company.Flag = this.company.TypeId == null ? 'IN' : 'UP';               
                this.company.UserCode = this.empInfo.EmpId;
                this.company.MainTypeId=1;
                this.company.TypeId = this.company.TypeId == null ? '' : this.company.TypeId;
                                let ciphertext = this.appService.getEncrypted(this.company);
                this.allmasterService.postCompanyType(ciphertext).subscribe((resData: any) => {
                  if (resData.StatusCode != 0) {
                    AppComponent.SmartAlert.Success(resData.Message);
                    AppComponent.Router.navigate(['/master/company-type-master']);
                  }
                  else { AppComponent.SmartAlert.Errmsg(resData.Message); }
                });
              }
              ngOnDestroy() {
                this.datashare.updateShareData(null);
              }
            
            }
            
