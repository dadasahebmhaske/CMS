import { Component, OnInit, OnDestroy } from '@angular/core';
import { DatashareService } from '../../../core/custom-services/datashare.service';
import { AppComponent } from '../../../app.component';
import { AppService } from '@app/core/custom-services/app.service';
import { AllmasterService } from '@app/features/master/allmaster.service';
import { ProjectService } from '../project.service';
@Component({
  selector: 'sa-generate-po',
  templateUrl: './generate-po.component.html',
  styleUrls: ['./generate-po.component.css']
})
export class GeneratePoComponent implements OnInit, OnDestroy {
            public cpInfo: any;
            public transport: any = {RoleCode:''};
            public loaderbtn: boolean = true;
            public SiteData:any=[];
            public AMTypeData:any=[];
            constructor(private appService: AppService, private datashare: DatashareService,private allmasterService:AllmasterService,private projectService:ProjectService ) { }
            ngOnInit() {
              this.getAllonload();
              this.datashare.GetSharedData.subscribe(data => this.transport = data == null ? { IsActive: 'Y',TaxationTermId:'',PaymentTermId:'',DeliveryTermId:'',SiteId:'',PManageId:'',ProjectId:'',MaterialId:'',MaterialTypeId:'',RoleCode:'',RateType:'' } :{ IsActive: 'Y',TaxationTermId:'',PaymentTermId:'',DeliveryTermId:'',SiteId:'',PManageId:'',ProjectId:'',MaterialId:'',MaterialTypeId:'',RoleCode:'',RateType:'' });
              this.appService.getAppData().subscribe(data => { this.cpInfo = data });
            }

            public getAllonload() {
              this.allmasterService.getSite('Y').subscribe((resSData: any) => {
                if (resSData.StatusCode != 0) {
                  this.SiteData = resSData.Data;
                }
                else { this.SiteData = []; AppComponent.SmartAlert.Errmsg(resSData.Message); }
              });
              this.projectService.getAMType(2).subscribe((resMaterial: any) => {
                if (resMaterial.StatusCode != 0) {
                  this.AMTypeData = resMaterial.Data; console.log(resMaterial.Data);
                }
                else { this.AMTypeData = []; AppComponent.SmartAlert.Errmsg(resMaterial.Message); }
              });
          
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
          