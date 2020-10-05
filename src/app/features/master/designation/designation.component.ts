import { Component, OnInit, OnDestroy } from '@angular/core';
import { DatashareService } from '../../../core/custom-services/datashare.service';
import { AppComponent } from '../../../app.component';

import { AppService } from '@app/core/custom-services/app.service';
import { AllmasterService } from '../allmaster.service';
@Component({
  selector: 'sa-designation',
  templateUrl: './designation.component.html',
  styleUrls: ['./designation.component.css']
})
export class DesignationComponent implements OnInit, OnDestroy {
      public empInfo: any;
      public desig: any = {};
      public loaderbtn: boolean = true;
      constructor(private appService: AppService, private datashare: DatashareService, private allmasterService:AllmasterService) { }
      ngOnInit() {
        this.datashare.GetSharedData.subscribe(data => this.desig = data == null ? { IsActive: 'Y' } : data);
        this.appService.getAppData().subscribe(data => { this.empInfo = data });
      }
      public onSubmit() {
        this.loaderbtn = false;
        this.desig.Flag = this.desig.DesigId == null ? 'IN' : 'UP';
        this.desig.UserCode = this.empInfo.EmpId;
        this.desig.DesigId = this.desig.DesigId == null ? '' : this.desig.DesigId;
        let ciphertext = this.appService.getEncrypted(this.desig);
        this.allmasterService.post('ManageDesignation',ciphertext).subscribe((resData: any) => {
          this.loaderbtn = true;
          if (resData.StatusCode != 0) {
            AppComponent.SmartAlert.Success(resData.Message);
            AppComponent.Router.navigate(['/master/designation-master']);
          }
          else { AppComponent.SmartAlert.Errmsg(resData.Message); }
        });
      }
      ngOnDestroy() {
        this.datashare.updateShareData(null);
      }
    
    }
    