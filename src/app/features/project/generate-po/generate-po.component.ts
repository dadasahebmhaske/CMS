import { Component, OnInit, OnDestroy } from '@angular/core';
import { DatashareService } from '../../../core/custom-services/datashare.service';
import { AppComponent } from '../../../app.component';
import { AppService } from '@app/core/custom-services/app.service';
@Component({
  selector: 'sa-generate-po',
  templateUrl: './generate-po.component.html',
  styleUrls: ['./generate-po.component.css']
})
export class GeneratePoComponent implements OnInit, OnDestroy {
            public cpInfo: any;
            public transport: any = {RoleCode:''};
            public loaderbtn: boolean = true;
            constructor(private appService: AppService, private datashare: DatashareService) { }
            ngOnInit() {
              this.datashare.GetSharedData.subscribe(data => this.transport = data == null ? { IsActive: 'Y',TaxationTermId:'',PaymentTermId:'',DeliveryTermId:'',SiteId:'',PManageId:'',ProjectId:'',MaterialId:'',MaterialTypeId:'',RoleCode:'',RateType:'' } :{ IsActive: 'Y',TaxationTermId:'',PaymentTermId:'',DeliveryTermId:'',SiteId:'',PManageId:'',ProjectId:'',MaterialId:'',MaterialTypeId:'',RoleCode:'',RateType:'' });
              this.appService.getAppData().subscribe(data => { this.cpInfo = data });
            }
            public onSubmit() {
              this.loaderbtn = false;
              this.transport.Flag = this.transport.VehicleTypeId == null ? 'IN' : 'UP';
              this.transport.CPCode = this.cpInfo.CPCode;
              this.transport.UserCode = this.cpInfo.EmpId;
              this.transport.VehicleTypeId = this.transport.VehicleTypeId == null ? '' : this.transport.VehicleTypeId;
              this.transport.TransChk = 1;
              let ciphertext = this.appService.getEncrypted(this.transport);
              // this.transportService.postTransport(ciphertext).subscribe((resData: any) => {
              //   if (resData.StatusCode != 0) {
              //     AppComponent.SmartAlert.Success(resData.Message);
              //     AppComponent.Router.navigate(['/master/transport-master']);
              //   }
              //   else { AppComponent.SmartAlert.Errmsg(resData.Message); }
              // });
            }
            ngOnDestroy() {
              this.datashare.updateShareData(null);
            }
          
          }
          