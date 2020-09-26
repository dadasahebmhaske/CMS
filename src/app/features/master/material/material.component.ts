import { Component, OnInit, OnDestroy } from '@angular/core';
import { DatashareService } from '../../../core/custom-services/datashare.service';
import { AppComponent } from '../../../app.component';
import { AppService } from '@app/core/custom-services/app.service';
import { AllmasterService } from '../allmaster.service';
@Component({
  selector: 'sa-material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.css']
})
export class MaterialComponent implements OnInit, OnDestroy {
          public cpInfo: any;
          public material: any = {RoleCode:''};
          public loaderbtn: boolean = true;
          public unitData:any=[];
          constructor(private appService: AppService, private datashare: DatashareService,private allmasterService:AllmasterService) { }
          ngOnInit() {
            this.datashare.GetSharedData.subscribe(data => this.material = data == null ? {UOM:'', IsActive: 'Y'} : data);
            this.appService.getAppData().subscribe(data => { this.cpInfo = data });
            this.allOnloadMethods();
          }
          allOnloadMethods() {
            this.allmasterService.getUOM().subscribe((resD: any) => {
              if (resD.StatusCode != 0) {
                this.unitData = resD.Data; 
              }
              else { this.unitData = []; AppComponent.SmartAlert.Errmsg(resD.Message); }
            });}
          public onSubmit() {
            this.loaderbtn = false;
            this.material.Flag = this.material.MatId == null ? 'IN' : 'UP';
            this.material.TypeId = 103;
            this.material.UserCode = this.cpInfo.EmpId;
            this.material.MatId = this.material.MatId == null ? '' : this.material.MatId;
            let ciphertext = this.appService.getEncrypted(this.material);
            this.allmasterService.postMaterial(ciphertext).subscribe((resData: any) => {
              if (resData.StatusCode != 0) {
                AppComponent.SmartAlert.Success(resData.Message);
                AppComponent.Router.navigate(['/master/material-master']);
              }
              else { AppComponent.SmartAlert.Errmsg(resData.Message); }
            });
          }
          ngOnDestroy() {
            this.datashare.updateShareData(null);
          }
        
        }
        