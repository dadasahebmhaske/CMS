import { Component, OnInit, OnDestroy } from '@angular/core';
import { DatashareService } from '../../../core/custom-services/datashare.service';
import { AppComponent } from '../../../app.component';
import { AppService } from '@app/core/custom-services/app.service';
import { AllmasterService } from '../allmaster.service';
@Component({
  selector: 'sa-unit-of-measurement',
  templateUrl: './unit-of-measurement.component.html',
  styleUrls: ['./unit-of-measurement.component.css']
})
export class UnitOfMeasurementComponent implements OnInit, OnDestroy {
      public empInfo: any;
      public unit: any = {};
      public loaderbtn: boolean = true;
      constructor(private appService: AppService, private datashare: DatashareService,private allmasterService:AllmasterService) { }
      ngOnInit() {
        this.datashare.GetSharedData.subscribe(data => this.unit = data == null ? { IsActive: 'Y' } : data);
        this.appService.getAppData().subscribe(data => { this.empInfo = data });
      }
      public onSubmit() {
        this.loaderbtn = false;
        this.unit.Flag = this.unit.UOMId == null ? 'IN' : 'UP';
        this.unit.UserCode = this.empInfo.EmpId;
        this.unit.UOMId = this.unit.UOMId == null ? '' : this.unit.UOMId;
        let ciphertext = this.appService.getEncrypted(this.unit);
        this.allmasterService.post('ManageUOM',ciphertext).subscribe((resData: any) => {
          this.loaderbtn = true;
          if (resData.StatusCode != 0) {
            AppComponent.SmartAlert.Success(resData.Message);
            AppComponent.Router.navigate(['/master/unit-of-measurement-master']);
          }
          else { AppComponent.SmartAlert.Errmsg(resData.Message); }
        });
      }
      ngOnDestroy() {
        this.datashare.updateShareData(null);
      }
    
    }
    