import { Component, OnInit, OnDestroy } from '@angular/core';
import { DatashareService } from '../../../core/custom-services/datashare.service';
import { AppComponent } from '../../../app.component';
import { AppService } from '@app/core/custom-services/app.service';
import { AllmasterService } from '@app/features/master/allmaster.service';
import { ProjectService } from '../project.service';
@Component({
  selector: 'sa-material-issue-slip',
  templateUrl: './material-issue-slip.component.html',
  styleUrls: ['./material-issue-slip.component.css']
})
export class MaterialIssueSlipComponent implements OnInit, OnDestroy {
                public Access: boolean = true;
                public empInfo: any;cpInfo;
                public loaderbtn: boolean = true;
                public SiteData: any = [];
                public Material: any = { TypeId: '', MatId: '' };
                public MaterialArray: any = [];
                public GRNData: any = [];
                public other: any = { OtherExpId: '' };
                public AMTypeData: any = []; project: any = {};transport: any = {}; ProjectData: any = []; PayTData: any = []; DeliveryTData: any = []; TaxationData: any = [];
                VendorData: any = []; ExecutiveData: any = []; AMData: any = []; filterMaterialArray: any = []; TranExists: any = [];
              
              constructor(private appService: AppService, private datashare: DatashareService, private allmasterService: AllmasterService, private projectService: ProjectService) { }
              ngOnInit() {
                this.datashare.GetSharedData.subscribe(data => {
                  this.project = data == null ? { IsActive: 'Y', SiteId: '', ProjectExecutiveId: '', DeliveryTermId: '', ProjectId: '', PaymentTermId: '', TaxationTermId: '', VendorId: '', RefTranNo: '' } : data;
            
                 // if (this.project.TranNo != null)
                   // this.getTranData();
                });
                this.appService.getAppData().subscribe(data => { this.empInfo = data });
            
                this.getAllonload();
              }

              public getAllonload() {
                this.allmasterService.getSite('Y').subscribe((resSData: any) => {
                  if (resSData.StatusCode != 0) {
                    this.SiteData = resSData.Data;
                  }
                  else { this.SiteData = []; AppComponent.SmartAlert.Errmsg(resSData.Message); }
                });
            
               
                this.projectService.getVendorContractor(102).subscribe((resVData: any) => {
                  if (resVData.StatusCode != 0) {
                    this.VendorData = resVData.Data;
                    let obj;
                    obj = this.projectService.filterData(this.VendorData, 102, 'CompanyTypeId');
                    this.VendorData = obj;
                  }
                  else { this.VendorData = []; AppComponent.SmartAlert.Errmsg(resVData.Message); }
                });
            
                // this.projectService.getAMType(4).subscribe((resOtherExp: any) => {
                //   if (resOtherExp.StatusCode != 0) {
                //     this.OtherExpTypeData = resOtherExp.Data;
                //     this.onGetExpensesData();
                //   }
                //   else { AppComponent.SmartAlert.Errmsg(resOtherExp.Message); }
                // });
              }




             
              ngOnDestroy() {
                this.datashare.updateShareData(null);
              }
            
            }
            
