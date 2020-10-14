import { Component, OnInit, OnDestroy } from '@angular/core';
import { DatashareService } from '../../../core/custom-services/datashare.service';
import { AppComponent } from '../../../app.component';
import { AppService } from '@app/core/custom-services/app.service';
import { AllmasterService } from '@app/features/master/allmaster.service';
import { ProjectService } from '../project.service';
import { BsDatepickerConfig } from 'ngx-bootstrap';
@Component({
  selector: 'sa-material-issue-slip',
  templateUrl: './material-issue-slip.component.html',
  styleUrls: ['./material-issue-slip.component.css']
})
export class MaterialIssueSlipComponent implements OnInit, OnDestroy {
                public Access: boolean = true;
                public empInfo: any;cpInfo;
                public loaderbtn: boolean = true;
                public datePickerConfig: Partial<BsDatepickerConfig>;
                public SiteData: any = [];
                public Material: any = { TypeId: '', MatId: '' };
                public MaterialArray: any = [];
                public StartMindate: Date;
                public maxDate: Date = new Date();
                mytime: Date = new Date();
                public GRNData: any = [];
                public other: any = { OtherExpId: '' };
                public AMTypeData: any = []; project: any = {};transport: any = {}; ProjectData: any = []; PayTData: any = []; DeliveryTData: any = []; TaxationData: any = [];
                VendorData: any = []; ExecutiveData: any = []; AMData: any = []; filterMaterialArray: any = []; TranExists: any = [];
              
              constructor(private appService: AppService, private datashare: DatashareService, private allmasterService: AllmasterService, private projectService: ProjectService) {
                this.datePickerConfig = Object.assign({}, { containerClass: 'theme-orange', maxDate: this.maxDate, dateInputFormat: 'DD-MMM-YYYY', showWeekNumbers: false, adaptivePosition: true, isAnimated: true });
               }
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
            
               
                this.projectService.getVendorContractor(107).subscribe((resVData: any) => {
                  if (resVData.StatusCode != 0) {
                    this.VendorData = resVData.Data;
                    let obj;
                    obj = this.projectService.filterData(this.VendorData, 107, 'CompanyTypeId');
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

              public onSelectSite() {
                this.projectService.getProject(this.project.SiteId).subscribe((resSData: any) => {
                  if (resSData.StatusCode != 0) {
                    this.ProjectData = resSData.Data;
                  }
                  else { this.ProjectData = []; AppComponent.SmartAlert.Errmsg(resSData.Message); }
                });
              }

              onSelectActivityMaterial() {
                let obj;
                obj = this.projectService.filterData(this.AMTypeData, this.Material.TypeId, 'TypeId');
                this.Material.TypeName = obj[0].TypeName;
                this.Material.MainTypeId = obj[0].MainTypeId;
                //this.OtherExp = obj[0].MainTypeId == 4 ? true : false;
                obj = this.projectService.filterData(this.AMData, this.Material.TypeId, 'TypeId');
                this.filterMaterialArray = obj;
            
              }

              public onSelectProject(TranNo,RefTranNo) {
                this.MaterialArray=[];
                this.project.TotalAmtCost=null; this.project.TotProjectCost=null;
                this.project.TotIGSTCost=null;this.project.TotCGSTCost=null;this.project.TotSGSTCost=null;
                let tranNo=this.project.TranNo==null?'':this.project.TranNo;
                this.projectService.getProjectExecutiveGRNMaterial(tranNo,this.project.ProjectId,RefTranNo).subscribe((resData: any) => {
                  if (resData.StatusCode != 0) {
                  if(RefTranNo==''){ 
                    this.ExecutiveData = resData.Data.Table;
                    this.GRNData=resData.Data.Table1;
                  }
                  else{
                    this.AMTypeData=resData.Data.Table;
                    this.AMData = resData.Data.Table1; 
                    console.log(this.AMTypeData);
                    console.log(this.AMData);
                  }
                  }
                  else { this.ExecutiveData = []; this.AMData = []; this.AMTypeData=[];AppComponent.SmartAlert.Errmsg(resData.Message); }
                });
              }

              onSelectMaterial() {
                let obj;
                obj = this.projectService.filterData(this.AMData, this.Material.MatId, 'MatActExpId');
                this.Material.MatName = obj[0].MatName;
                this.Material.UOMId = obj[0].UOMId;
                this.Material.UOM = obj[0].UOM;
                this.Material.UQty = obj[0].Qty;
                // this.Material.RQty = obj[0].Qty;
                // this.Material.URate = obj[0].Rate;
                // this.Material.URate = obj[0].Rate;
                // this.Material.UAmount = obj[0].Amount;
                // this.Material.UTotalAmount = obj[0].TotalAmount;
                this.Material.RefTranNo = obj[0].RefTranNo;
                this.Material.RefSrNo = obj[0].RefSrNo;
                // if (this.Material.UQty != null && this.Material.URate != null) {
                //   this.Material.UAmount = parseFloat(this.Material.URate == undefined || this.Material.URate == '' ? 0 : this.Material.URate) * parseFloat(this.Material.UQty == undefined || this.Material.UQty == '' ? 0 : this.Material.UQty);
                //   this.Material.UAmount = this.Material.UAmount.toFixed(2);
                // }
            
              }

              addMaterial() {
                if (this.Material.index != null) {
                  this.MaterialArray[this.Material.index].Qty = this.Material.UQty;
                 // this.project = this.projectService.calculatePOTotal(this.project, this.MaterialArray);
            
                } else if (this.MaterialArray.some(obj => (parseInt(obj.TypeId) === parseInt(this.Material.TypeId) && parseInt(obj.MatId) === parseInt(this.Material.MatId)))) {
                  AppComponent.SmartAlert.Errmsg("Material already added in list.");
                } else {
                  this.Material.Qty = this.Material.UQty;
                  this.Material.show = this.MaterialArray.some(obj => parseInt(obj.TypeId) === parseInt(this.Material.TypeId)) ? false : true;
                  this.MaterialArray.push(this.Material);
                 // this.project = this.projectService.calculatePOTotal(this.project, this.MaterialArray);
                  this.MaterialArray.sort((a, b) => `${a.MainTypeId}`.localeCompare(`${b.MainTypeId}`) || a.TypeName.localeCompare(b.TypeName));
                } this.Material = { TypeId: '', MatId: '' }
                //this.OtherExp = false;
            
              }

              onRemoveMaterial(data, index) {
                this.MaterialArray.splice(index, 1);
              }

              public onSubmit() {
                this.loaderbtn = false;
                this.project.Flag = this.project.TranNo == null || this.project.TranNo == '' ? 'IN' : 'UP';
                this.project.UserCode = this.empInfo.EmpId;
                this.project.TranNo = this.project.TranNo == null ? '' : this.project.TranNo;
                this.project.TranSubType = 1;
                this.project.TranType = 107;
                this.project.TranDate = new Date();
                this.project.Remark = '';
                // this.project.RefTranNo = this.MaterialArray[0].RefTranNo;
                this.project.Data = this.MaterialArray;
                let ciphertext = this.appService.getEncrypted(this.project);
                this.projectService.post('ManageMaterialIssue', ciphertext).subscribe((resData: any) => {
                  this.loaderbtn = true;
                  if (resData.StatusCode != 0) {
                    AppComponent.SmartAlert.Success(resData.Message);
                    AppComponent.Router.navigate(['/project/material-issue-slip-list']);
                  }
                  else { AppComponent.SmartAlert.Errmsg(resData.Message); }
                });
              }


             
              ngOnDestroy() {
                this.datashare.updateShareData(null);
              }
            
            }
            
