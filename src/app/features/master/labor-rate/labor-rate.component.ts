import { Component, OnInit, OnDestroy } from '@angular/core';
import { DatashareService } from '../../../core/custom-services/datashare.service';
import { AppComponent } from '../../../app.component';
import { AppService } from '@app/core/custom-services/app.service';
import { AllmasterService } from '../allmaster.service';
@Component({
  selector: 'sa-labor-rate',
  templateUrl: './labor-rate.component.html',
  styleUrls: ['./labor-rate.component.css']
})
export class LaborRateComponent implements OnInit, OnDestroy {
  public empInfo: any;
  public work: any = {RoleCode:''};
  public loaderbtn: boolean = true;
  public unitData:any=[];
  constructor(private appService: AppService, private datashare: DatashareService,private allmasterService:AllmasterService) { }
  ngOnInit() {
    this.datashare.GetSharedData.subscribe(data => this.work = data == null ? {UOM:'', IsActive: 'Y'} : data);
    this.appService.getAppData().subscribe(data => { this.empInfo = data });
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
    this.work.Flag = this.work.WorkId == null ? 'IN' : 'UP';
    this.work.TypeId = 104;
    this.work.UserCode = this.empInfo.EmpId;
    this.work.WorkId = this.work.WorkId == null ? '' : this.work.WorkId;
    let ciphertext = this.appService.getEncrypted(this.work);
    this.allmasterService.post('ManageLabourWork',ciphertext).subscribe((resData: any) => {
      if (resData.StatusCode != 0) {
        AppComponent.SmartAlert.Success(resData.Message);
        AppComponent.Router.navigate(['/master/labor-rate-master']);
      }
      else { AppComponent.SmartAlert.Errmsg(resData.Message); }
    });
  }
  ngOnDestroy() {
    this.datashare.updateShareData(null);
  }

}
