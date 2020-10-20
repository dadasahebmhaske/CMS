import { Component, OnInit, OnDestroy } from '@angular/core';
import { DatashareService } from '../../../core/custom-services/datashare.service';
import { AppComponent } from '../../../app.component';
import { AppService } from '@app/core/custom-services/app.service';
import { AllmasterService } from '@app/features/master/allmaster.service';
import { ProjectService } from '../project.service';
import { BsDatepickerConfig } from 'ngx-bootstrap';

@Component({
  selector: 'sa-labour-contract',
  templateUrl: './labour-contract.component.html',
  styleUrls: ['./labour-contract.component.css']
})
export class LabourContractComponent implements OnInit, OnDestroy {
              public cpInfo: any;empInfo;
              public datePickerConfig: Partial<BsDatepickerConfig>;
              public minDate: Date;
              public StartMindate: Date;
              public maxDate: Date = new Date();
              public transport: any = {RoleCode:''};
              public loaderbtn: boolean = true;editflag;AMTypeData:any=[];AMData:any=[];
              public project:any={};Material:any={};MaterialArray:any=[];PayTData:any=[];filterMaterialArray:any=[];
              public SiteData:any=[];VendorData:any=[];ProjectData:any=[];LabourWork:any=[];ContractorData:any=[];

              constructor(private appService: AppService, private datashare: DatashareService,private allmasterService:AllmasterService,private projectService:ProjectService) {
                this.datePickerConfig = Object.assign({}, { containerClass: 'theme-orange', maxDate: this.maxDate, dateInputFormat: 'DD-MMM-YYYY', showWeekNumbers: false, adaptivePosition: true, isAnimated: true });
               }

              ngOnInit() {
                this.datashare.GetSharedData.subscribe(data => {
                  this.project = data == null ? { IsActive: 'Y', SiteId: '',  ProjectId: '',ContractorId:'',RefTranNo:''} : data;
                 
                  if (this.project.TranNo != null)
                   this.getTranData();
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

               
                  this.allmasterService.getlabourWork('Y').subscribe((resLData: any) => {
                    if (resLData.StatusCode != 0) {
                      this.LabourWork = resLData.Data;
                      console.log(this.LabourWork);
                    }
                    else { this.LabourWork = []; AppComponent.SmartAlert.Errmsg(resLData.Message); }
                  });

                  this.allmasterService.getPayTerm('Y').subscribe((resPData: any) => {
                    if (resPData.StatusCode != 0) {
                      this.PayTData = resPData.Data;
                    }
                    else { this.PayTData = []; AppComponent.SmartAlert.Errmsg(resPData.Message); }
                  });
              
             
                this.projectService.getVendorContractor(101).subscribe((resVData: any) => {
                  if (resVData.StatusCode != 0) {
                    this.ContractorData = resVData.Data;
                    let obj;
                    obj = this.projectService.filterData(this.ContractorData, 101 , 'CompanyTypeId');
                    this.ContractorData = obj;
                  }
                  else { this.ContractorData = []; AppComponent.SmartAlert.Errmsg(resVData.Message); }
                });
              }

              public getTranData() {
                this.projectService.getTransDetails(109, this.project.TranNo).subscribe((resTran: any) => {
                  if (resTran.StatusCode != 0) {
                    //this.TranExists = resTran.Data.Table;
                   // this.Access = this.TranExists.length == 0 ? this.project.IsApproved == 'Y' ? false : true : false;
                    this.project = resTran.Data.Table1[0];
                    this.MaterialArray = resTran.Data.Table2;
                    this.onSelectSite(this.project.SiteId,'S');
                   this.onSelectProject('','');
                  // this.onSelectProject(this.project.RefTranNo);
                  // this.onSelectVendor(); 
                   
                    let tempArray = [];
                    for (let i = 0; i < this.MaterialArray.length; i++) {
                      this.Material = this.MaterialArray[i];
                      this.Material.show = tempArray.some(obj => parseInt(obj.TypeId) === parseInt(this.Material.TypeId)) ? false : true;
                      tempArray.push(this.Material);
                    }
                    this.project = this.projectService.calculatePOTotal(this.project, this.MaterialArray);
                    this.MaterialArray = tempArray;
                    this.Material = { TypeId: '', MatActExpId: '' }
                  }
                });
              }
  

              public onSelectSite(id,param) {
                this.projectService.getProject(id).subscribe((resSData: any) => {
                  if (resSData.StatusCode != 0) {
                      this.ProjectData = resSData.Data;
                  }
                  else { this.ProjectData = []; AppComponent.SmartAlert.Errmsg(resSData.Message); }
                });
              }

              public onSelectProject(TranNo,RefTranNo) {
                if(this.project.TranNo==null){
                  this.MaterialArray=[];
                  this.Material={};
                  this.project = this.projectService.calculatePOTotal(this.project, this.MaterialArray);
                }
               
                this.project.TotalAmtCost=null; this.project.TotProjectCost=null;
                this.project.TotIGSTCost=null;this.project.TotCGSTCost=null;this.project.TotSGSTCost=null;
                let tranNo=this.project.TranNo==null?'':this.project.TranNo;
                this.projectService.getContractorLabourWork(tranNo,this.project.ProjectId,'').subscribe((resData: any) => {
                  if (resData.StatusCode != 0) {
                  if(tranNo==''){ 
                    this.AMTypeData = resData.Data.Table1;
                    this.AMData = resData.Data.Table2;
                  }
                  else{
                     this.AMTypeData=resData.Data.Table1;
                     this.AMData = resData.Data.Table2; 
                  }
                  }
                  else {  this.AMData = []; this.AMTypeData=[];AppComponent.SmartAlert.Errmsg(resData.Message); }
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

              onSelectMaterial() {
                let obj;
                obj = this.projectService.filterData(this.AMData, this.Material.WorkId, 'MatActExpId');
                this.Material.WorkName = obj[0].WorkName;
                this.Material.UOMId = obj[0].UOMId;
                this.Material.UOM = obj[0].UOM;
                this.Material.UQty = obj[0].Qty;
                this.Material.RQty = obj[0].RemainBudgetQty;
                this.Material.URate = obj[0].Rate;
                this.Material.URate = obj[0].Rate;
                this.Material.UAmount = obj[0].Amount;
                this.Material.UTotalAmount = obj[0].TotalAmount;
                this.Material.RefTranNo = obj[0].RefTranNo;
                this.Material.RefSrNo = obj[0].RefSrNo;

                if (this.Material.UQty != null && this.Material.URate != null) {
                  this.Material.UAmount = parseFloat(this.Material.URate == undefined || this.Material.URate == '' ? 0 : this.Material.URate) * parseFloat(this.Material.UQty == undefined || this.Material.UQty == '' ? 0 : this.Material.UQty);
                  this.Material.UAmount = this.Material.UAmount.toFixed(2);
                }
            
                this.Material.CGSTAmount = this.Material.CGSTAmount == undefined || this.Material.CGSTAmount == '' || this.Material.CGSTAmount == null ? 0 : this.Material.CGSTAmount;
                this.Material.SGSTAmount = this.Material.SGSTAmount == undefined || this.Material.SGSTAmount == '' || this.Material.SGSTAmount == null ? 0 : this.Material.SGSTAmount;
                this.Material.IGSTAmount = this.Material.IGSTAmount == undefined || this.Material.IGSTAmount == '' || this.Material.IGSTAmount == null ? 0 : this.Material.IGSTAmount;
            
                this.Material.IGST = this.Material.IGST == undefined || this.Material.IGST == '' || this.Material.IGST == null ? 0 : this.Material.IGST;
                this.Material.CGST = this.Material.CGST == undefined || this.Material.CGST == '' || this.Material.CGST == null ? 0 : this.Material.CGST;
                this.Material.SGST = this.Material.SGST == undefined || this.Material.SGST == '' || this.Material.SGST == null ? 0 : this.Material.SGST;
            
                if (this.Material.IGST == 0 || this.Material.IGST == null) {
                  this.Material.CGSTAmount = 0;
                  this.Material.SGSTAmount = 0;
                  
                  this.Material.CGSTAmount = (parseFloat(this.Material.UAmount) * parseFloat(this.Material.CGST)) / 100;
                  this.Material.CGSTAmount = this.Material.CGSTAmount.toFixed(2);
                  this.Material.SGSTAmount = (parseFloat(this.Material.UAmount) * parseFloat(this.Material.SGST)) / 100;
                  this.Material.SGSTAmount = this.Material.SGSTAmount.toFixed(2);
                  this.Material.IGSTAmount = 0;
            
                  this.Material.UTotalAmount = parseFloat(this.Material.UAmount) + parseFloat(this.Material.CGSTAmount) + parseFloat(this.Material.SGSTAmount);
                }
                else {
                  this.Material.IGSTAmount = 0;
                  this.Material.IGSTAmount = (parseFloat(this.Material.UAmount) * parseFloat(this.Material.IGST)) / 100;
                  this.Material.IGSTAmount = this.Material.IGSTAmount.toFixed(2);
                  this.Material.UTotalAmount = parseFloat(this.Material.UAmount) + parseFloat(this.Material.IGSTAmount);
                }
            
              }

              GetCalculate() {
                if(parseInt(this.Material.UQty)>parseInt(this.Material.RQty)){
                  AppComponent.SmartAlert.Errmsg(`Quantity exceeded the Raised qauntity`);
                  this.Material.UQty=null;
                }
                if (this.Material.UQty != null && this.Material.URate != null) {
                  this.Material.UAmount = parseFloat(this.Material.URate == undefined || this.Material.URate == '' ? 0 : this.Material.URate) * parseFloat(this.Material.UQty == undefined || this.Material.UQty == '' ? 0 : this.Material.UQty);
                  this.Material.UAmount = this.Material.UAmount.toFixed(2);
                }
            
                this.Material.CGSTAmount = this.Material.CGSTAmount == undefined || this.Material.CGSTAmount == '' || this.Material.CGSTAmount == null ? 0 : this.Material.CGSTAmount;
                this.Material.SGSTAmount = this.Material.SGSTAmount == undefined || this.Material.SGSTAmount == '' || this.Material.SGSTAmount == null ? 0 : this.Material.SGSTAmount;
                this.Material.IGSTAmount = this.Material.IGSTAmount == undefined || this.Material.IGSTAmount == '' || this.Material.IGSTAmount == null ? 0 : this.Material.IGSTAmount;
            
                this.Material.IGST = this.Material.IGST == undefined || this.Material.IGST == '' || this.Material.IGST == null ? 0 : this.Material.IGST;
                this.Material.CGST = this.Material.CGST == undefined || this.Material.CGST == '' || this.Material.CGST == null ? 0 : this.Material.CGST;
                this.Material.SGST = this.Material.SGST == undefined || this.Material.SGST == '' || this.Material.SGST == null ? 0 : this.Material.SGST;
            
                if (this.Material.IGST == 0 || this.Material.IGST == null) {
                  this.Material.CGSTAmount = 0;
                  this.Material.SGSTAmount = 0;
                  this.Material.CGSTAmount = (parseFloat(this.Material.UAmount) * parseFloat(this.Material.CGST)) / 100;
                  this.Material.CGSTAmount = this.Material.CGSTAmount.toFixed(2);
                  this.Material.SGSTAmount = (parseFloat(this.Material.UAmount) * parseFloat(this.Material.SGST)) / 100;
                  this.Material.SGSTAmount = this.Material.SGSTAmount.toFixed(2);
                  this.Material.IGSTAmount = 0;
                  this.Material.UTotalAmount = parseFloat(this.Material.UAmount) + parseFloat(this.Material.CGSTAmount) + parseFloat(this.Material.SGSTAmount);
                }
                else {
                  this.Material.IGSTAmount = 0;
                  this.Material.IGSTAmount = (parseFloat(this.Material.UAmount) * parseFloat(this.Material.IGST)) / 100;
                  this.Material.IGSTAmount = this.Material.IGSTAmount.toFixed(2);
                  this.Material.SGSTAmount =0;
                  this.Material.CGSTAmount=0;
                  this.Material.UTotalAmount = parseFloat(this.Material.UAmount) + parseFloat(this.Material.IGSTAmount);
                }
            
            
              }


              addMaterial() {
                if (this.Material.index != null) {
                  this.MaterialArray[this.Material.index].Rate = this.Material.URate;
                  this.MaterialArray[this.Material.index].Qty = this.Material.UQty;
                  this.MaterialArray[this.Material.index].Amount = this.Material.UAmount;
                  this.MaterialArray[this.Material.index].IGST = this.Material.IGST;
                  this.MaterialArray[this.Material.index].CGST = this.Material.CGST;
                  this.MaterialArray[this.Material.index].SGST = this.Material.SGST;
                  this.MaterialArray[this.Material.index].IGSTAmount = this.Material.IGSTAmount;
                  this.MaterialArray[this.Material.index].SGSTAmount = this.Material.SGSTAmount;
                  this.MaterialArray[this.Material.index].SGSTAmount = this.Material.SGSTAmount;
                  this.MaterialArray[this.Material.index].TotalAmount = this.Material.UTotalAmount;
                  this.project = this.projectService.calculatePOTotal(this.project, this.MaterialArray);
            
                } else if (this.MaterialArray.some(obj => (parseInt(obj.TypeId) === parseInt(this.Material.TypeId) && parseInt(obj.WorkId) === parseInt(this.Material.WorkId)))) {
                  AppComponent.SmartAlert.Errmsg("Material already added in list.");
                } else {
                  this.Material.Qty = this.Material.UQty;
                  this.Material.Rate = this.Material.URate;
                  this.Material.Amount = this.Material.UAmount;
                  this.Material.TotalAmount = this.Material.UTotalAmount;
                  this.Material.show = this.MaterialArray.some(obj => parseInt(obj.TypeId) === parseInt(this.Material.TypeId)) ? false : true;
                  this.MaterialArray.push(this.Material);
                  this.project = this.projectService.calculatePOTotal(this.project, this.MaterialArray);
                  this.MaterialArray.sort((a, b) => `${a.MainTypeId}`.localeCompare(`${b.MainTypeId}`) || a.TypeName.localeCompare(b.TypeName));
                } this.Material = { TypeId: '', MatId: '' }
                //this.OtherExp = false;
            
              }

              onRemoveMaterial(data, index) {
                this.MaterialArray.splice(index, 1);
                this.project = this.projectService.calculatePOTotal(this.project, this.MaterialArray);
              }
              onEdit(mat, i) {
                mat.index = i;
                this.Material = mat;
                this.Material.URate = mat.Rate;
                this.Material.UQty = mat.Qty;
                this.Material.RQty = mat.RemainBudgetQty;
                this.Material.UAmount = mat.Amount;
                this.Material.UTotalAmount = mat.TotalAmount;
                //this.Material.UAmount = mat.Amount;
                // if (this.Material.MainTypeId == 4) { this.Material.UAmount = mat.Rate }
                this.onSelectActivityMaterial();
              }
            

              public onSubmit() {
                this.loaderbtn = false;
                this.project.Flag = this.project.TranNo == null|| this.project.TranNo == ''? 'IN' : 'UP';
                this.project.UserCode = this.empInfo.EmpId;
                this.project.TranNo = this.project.TranNo == null ? '' : this.project.TranNo;
                this.project.TranSubType = 1;
                this.project.TranType=109;
                this.project.TranDate = new Date();
                this.project.RefTranNo = this.MaterialArray[0].RefTranNo;
                this.project.RefSrNo = this.MaterialArray[0].RefSrNo;
                this.project.ContractDate= this.appService.DateToString(this.project.ContractDate);
                this.project.StartDate= this.appService.DateToString(this.project.StartDate);
                this.project.EndDate= this.appService.DateToString(this.project.EndDate);
               
                this.project.Data = this.MaterialArray;
                let ciphertext = this.appService.getEncrypted(this.project);
                this.projectService.post('ManageWorkContract', ciphertext).subscribe((resData: any) => {
                  this.loaderbtn = true;
                  if (resData.StatusCode != 0) {
                    AppComponent.SmartAlert.Success(resData.Message);
                    AppComponent.Router.navigate(['/project/labour-contract-list']);
                  }
                  else { AppComponent.SmartAlert.Errmsg(resData.Message); }
                });
              }
              ngOnDestroy() {
                this.datashare.updateShareData(null);
              }
            
            }
            