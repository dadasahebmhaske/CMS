import { Component, OnInit, OnDestroy } from '@angular/core';
import { DatashareService } from '../../../core/custom-services/datashare.service';
import { AppComponent } from '../../../app.component';
import { AppService } from '@app/core/custom-services/app.service';
import { AllmasterService } from '../allmaster.service';
@Component({
  selector: 'sa-material-type',
  templateUrl: './material-type.component.html',
  styleUrls: ['./material-type.component.css']
})
export class MaterialTypeComponent implements OnInit, OnDestroy {
            public empInfo: any;
            public material: any = {RoleCode:''};
            public loaderbtn: boolean = true;
            constructor(private appService: AppService, private datashare: DatashareService,private allmasterService:AllmasterService) { }
            ngOnInit() {
              this.datashare.GetSharedData.subscribe(data => this.material = data == null ? { IsActive: 'Y',MainTypeId:'' } : data);
              this.appService.getAppData().subscribe(data => { this.empInfo = data });
            }
            public onSubmit() {
              this.loaderbtn = false;
              this.material.Flag = this.material.TypeId == null ? 'IN' : 'UP';
              this.material.UserCode = this.empInfo.EmpId;
              this.material.TypeId = this.material.TypeId == null ? '' : this.material.TypeId;
              let ciphertext = this.appService.getEncrypted(this.material);
              this.allmasterService.post('ManageTypes',ciphertext).subscribe((resData: any) => {
                this.loaderbtn = true;
                if (resData.StatusCode != 0) {
                  AppComponent.SmartAlert.Success(resData.Message);
                  AppComponent.Router.navigate(['/master/material-type-master']);
                }
                else { AppComponent.SmartAlert.Errmsg(resData.Message); }
              });
            }
            ngOnDestroy() {
              this.datashare.updateShareData(null);
            }
          
          }
          