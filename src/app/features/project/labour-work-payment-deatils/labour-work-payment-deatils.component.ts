import { Component, OnInit, OnDestroy } from '@angular/core';
import { DatashareService } from '../../../core/custom-services/datashare.service';
import { AppComponent } from '../../../app.component';
import { AppService } from '@app/core/custom-services/app.service';
import { AllmasterService } from '@app/features/master/allmaster.service';
import { ProjectService } from '../project.service';
import { BsDatepickerConfig } from 'ngx-bootstrap';

@Component({
  selector: 'sa-labour-work-payment-deatils',
  templateUrl: './labour-work-payment-deatils.component.html',
  styleUrls: ['./labour-work-payment-deatils.component.css']
})
export class LabourWorkPaymentDeatilsComponent implements OnInit, OnDestroy {
                  public Access: boolean = true;
                  public cpInfo: any;empInfo;
                  public datePickerConfig: Partial<BsDatepickerConfig>;
                  public minDate: Date;
                  public StartMindate: Date;
                  public maxDate: Date = new Date();
                   public loaderbtn: boolean = true;
                  public SiteData: any = [];
                  public mytime: Date = new Date();
                  public Material: any = { StartDate:new Date(),EndDate:new Date(), LabourId: '', TypeId: '' ,WorkId:'',EndTime:`${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDay()} 06:00 PM`,StartTime:`${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDay()} 09:00 AM`};
                  public MaterialArray: any = [];LabourData:any=[];
                  public AMTypeData: any = []; project: any = {}; ProjectData: any = []; PayTData: any = []; DeliveryTData: any = []; TaxationData: any = [];
                  VendorData: any = []; ExecutiveData: any = []; AMData: any = []; filterMaterialArray: any = []; TranExists: any = [];
                  
                  constructor(private appService: AppService, private datashare: DatashareService,private allmasterService:AllmasterService,private projectService:ProjectService) {
                    this.datePickerConfig = Object.assign({}, { containerClass: 'theme-orange', maxDate: this.maxDate, dateInputFormat: 'DD-MMM-YYYY', showWeekNumbers: false, adaptivePosition: true, isAnimated: true });
                   }
                  ngOnInit() {
                    this.datashare.GetSharedData.subscribe(data => {
                      this.project = data == null ? {IsActive: 'Y', SiteId: '', ProjectId: '', RefTranNo: '' } : data;

                      if (this.project.TranNo != null)
                        this.getTranData();
                    });
                    this.appService.getAppData().subscribe(data => { this.empInfo = data });
                    this.getAllonload();
                  }

                  public getAllonload() {
                    this.allmasterService.getSiteData(this.empInfo.EmpId).subscribe((resSData: any) => {
                      if (resSData.StatusCode != 0) {
                        this.SiteData = resSData.Data;
                      }
                      else { this.SiteData = []; AppComponent.SmartAlert.Errmsg(resSData.Message); }
                    });

                    this.allmasterService.getLabour('Y').subscribe((reLSData: any) => {
                      if (reLSData.StatusCode != 0) {
                        this.LabourData = reLSData.Data;console.log(this.LabourData);
                      }
                      else { this.LabourData = []; AppComponent.SmartAlert.Errmsg(reLSData.Message); }
                    });
                   
                  }

                  public getTranData() {
                    this.projectService.getTransDetails(112, this.project.TranNo).subscribe((resTran: any) => {
                      if (resTran.StatusCode != 0) {
                        this.TranExists = resTran.Data.Table;
                        this.Access = this.TranExists.length == 0 ? this.project.IsApproved == 'Y' ? false : true : false;
                        this.project = resTran.Data.Table1[0];
                        this.MaterialArray = resTran.Data.Table2;
                        this.onSelectSite();
                       this.onSelectProject('','');
                       this.onSelectProject('',this.project.RefTranNo);
                      // this.onSelectVendor(); 
                       
                        let tempArray = [];
                        for (let i = 0; i < this.MaterialArray.length; i++) {
                          this.Material = this.MaterialArray[i];
                          this.Material.show = tempArray.some(obj => parseInt(obj.TypeId) === parseInt(this.Material.TypeId)) ? false : true;
                          tempArray.push(this.Material);
                        }
                        this.project = this.projectService.calculateDailyWorkLabourAnount(this.project, this.MaterialArray);
                        this.MaterialArray = tempArray;
                        this.Material = {  LabourId: '', TypeId: '' ,WorkId:''}
                      }
                    });
                  }

                  public onSelectSite() {
                    this.allmasterService.getProjectData(this.project.SiteId,this.empInfo.EmpId).subscribe((resSData: any) => {
                      if (resSData.StatusCode != 0) {
                        this.ProjectData = resSData.Data;
                      }
                      else { this.ProjectData = []; AppComponent.SmartAlert.Errmsg(resSData.Message); }
                    });
                  }

                  public onSelectProject(TranNo,RefTranNo) {
                    if(this.project.TranNo==null){
                      this.MaterialArray=[];
                      this.Material= {  LabourId: '', TypeId: '' ,WorkId:''};
                      this.project = this.projectService.calculatePOTotal(this.project, this.MaterialArray);
                    }

                    let tranNo=this.project.TranNo==null?'':this.project.TranNo;
                    this.projectService.getDWactivityworklabour(tranNo,this.project.ProjectId,RefTranNo).subscribe((resData: any) => {
                      if (resData.StatusCode != 0) {
                      if(RefTranNo==''){ 
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
                  onSelectLabour(){
                    let obj;
                    obj = this.projectService.filterData(this.LabourData, this.Material.LabourId, 'LabourId');
                    this.Material.URate = obj[0].PerDayRate;
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
                    if(parseInt(this.Material.UQty)>parseInt(this.Material.RQty)){
                      AppComponent.SmartAlert.Errmsg(`Quantity exceeded the Raised qauntity`);
                      this.Material.UQty=null;
                    }

                    // if (this.Material.UQty != null && this.Material.URate != null) {
                    //   this.Material.UAmount = parseFloat(this.Material.URate == undefined || this.Material.URate == '' ? 0 : this.Material.URate) * parseFloat(this.Material.UQty == undefined || this.Material.UQty == '' ? 0 : this.Material.UQty);
                    //   this.Material.UAmount = this.Material.UAmount.toFixed(2);
                    // }

                    let obj;
                    obj = this.projectService.filterData(this.AMData, this.Material.WorkId, 'MatActExpId');
                    this.Material.WorkName = obj[0].WorkName;
                    this.Material.RefTranNo = obj[0].RefTranNo;
                    this.Material.RefSrNo = obj[0].RefSrNo;
                    this.Material.UOMId = obj[0].UOMId;
                    this.Material.UOM = obj[0].UOM;
                    this.Material.UQty = obj[0].Qty;
                   // this.Material.URate = obj[0].Rate;
                    this.Material.RQty = obj[0].RemainBudgetQty;
                  //  this.Material.UAmount = obj[0].Amount;
                    this.Material.CGST = 0;
                    this.Material.IGST = 0;
                    this.Material.SGST = 0;

                   
                
                  }


                  GetCalculate() {
                    if(parseInt(this.Material.UQty)>parseInt(this.Material.RQty)){
                      AppComponent.SmartAlert.Errmsg(`Quantity exceeded the Raised qauntity`);
                      this.Material.UQty=null;
                    }
                    // if (this.Material.UQty != null && this.Material.URate != null) {
                    //   this.Material.UAmount = parseFloat(this.Material.URate == undefined || this.Material.URate == '' ? 0 : this.Material.URate) * parseFloat(this.Material.UQty == undefined || this.Material.UQty == '' ? 0 : this.Material.UQty);
                    //   this.Material.UAmount = this.Material.UAmount.toFixed(2);
                    // }
                  }

                  addMaterial() {
                    if(this.Material.StartTime==null || this.Material.EndTime==null){
                      AppComponent.SmartAlert.Errmsg(`Please select ${this.Material.StartTime==null?'In Time':'Out Time'}`);
                    }else{

                    var d = new Date(this.Material.StartTime);
                    this.Material.DispStartTime = d.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
                    var d = new Date(this.Material.EndTime);
                    this.Material.DispEndTime = d.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });

                    let obj;
                    obj = this.projectService.filterData(this.LabourData, this.Material.LabourId, 'LabourId');
                    this.Material.LabourName = obj[0].LabourName;

                    if (this.Material.index != null) {
                      this.MaterialArray[this.Material.index].Rate = this.Material.URate;
                      this.MaterialArray[this.Material.index].Qty = this.Material.UQty;
                      this.MaterialArray[this.Material.index].Amount = this.Material.UAmount;
                      this.MaterialArray[this.Material.index].DispStartTime = this.Material.DispStartTime;
                      this.MaterialArray[this.Material.index].DispEndTime = this.Material.DispEndTime;
                      this.MaterialArray[this.Material.index].WorkDescription = this.Material.UWorkDescription;
                      this.MaterialArray[this.Material.index].IGST = this.Material.IGST;
                      this.MaterialArray[this.Material.index].CGST = this.Material.CGST;
                      this.MaterialArray[this.Material.index].SGST = this.Material.SGST;

                      this.project = this.projectService.calculateDailyWorkLabourAnount(this.project, this.MaterialArray);
                
                    } else if (this.MaterialArray.some(obj => (parseInt(obj.TypeId) === parseInt(this.Material.TypeId) && parseInt(obj.WorkId) === parseInt(this.Material.WorkId)))) {
                      AppComponent.SmartAlert.Errmsg("Material already added in list.");
                    } else {
                      this.Material.Qty = this.Material.UQty;
                      this.Material.Rate = this.Material.URate;
                      this.Material.Amount = this.Material.UAmount;
                      this.Material.WorkDescription = this.Material.UWorkDescription;

                     
                     // this.Material.DstartTime=this.Material.BindStartTime;
                    
                      this.Material.StartDate= this.appService.DateToString(this.Material.StartDate);
                      this.Material.EndDate= this.appService.DateToString(this.Material.EndDate)
                    
                      this.Material.show = this.MaterialArray.some(obj => parseInt(obj.TypeId) === parseInt(this.Material.TypeId)) ? false : true;
                      this.MaterialArray.push(this.Material);
                      this.project = this.projectService.calculateDailyWorkLabourAnount(this.project, this.MaterialArray);
                      this.MaterialArray.sort((a, b) => `${a.MainTypeId}`.localeCompare(`${b.MainTypeId}`) || a.TypeName.localeCompare(b.TypeName));
                    } this.Material = { TypeId: '', MatId: '' }
                    //this.OtherExp = false;
                  }
                  }

                  onRemoveMaterial(data, index) {
                    this.MaterialArray.splice(index, 1);
                    this.project = this.projectService.calculateDailyWorkLabourAnount(this.project, this.MaterialArray);
                  }

                  onEdit(mat, i) {
                    mat.index = i;
                    this.Material = mat;
                    this.Material.URate = mat.Rate;
                    this.Material.UQty = mat.Qty;
                    this.Material.BindStartTime = mat.DstartTime;
                    this.Material.BindEndTime = mat.DEndTime;
                    this.Material.RQty = mat.RemainBudgetQty;
                    this.Material.UAmount = mat.Amount;
                    //this.Material.StartTime=this.Material.Stime;
                    this.Material.UWorkDescription = mat.WorkDescription;
                    this.onSelectActivityMaterial();
                  }
      

                  public onSubmit() {
                    this.loaderbtn = false;
                    for(let i=0;i<this.MaterialArray.length;i++){
                      this.MaterialArray[i].StartTime=this.MaterialArray[i].DispStartTime;
                      this.MaterialArray[i].EndTime=this.MaterialArray[i].DispEndTime;
                    }

                    this.project.Flag = this.project.TranNo == null|| this.project.TranNo == ''? 'IN' : 'UP';
                    this.project.UserCode = this.empInfo.EmpId;
                    this.project.TranNo = this.project.TranNo == null ? '' : this.project.TranNo;
                    this.project.IsActive = 'Y';
                    this.project.TranSubType = 1;
                    this.project.TranType=112;
                    this.project.TranDate = new Date();
                    this.project.RefTranNo = this.MaterialArray[0].RefTranNo;
                    this.project.RefSrNo = this.MaterialArray[0].RefSrNo;
                    this.project.Data = this.MaterialArray;
                    let ciphertext = this.appService.getEncrypted(this.project);
                    this.projectService.post('ManageLabourWorkWages', ciphertext).subscribe((resData: any) => {
                      this.loaderbtn = true;
                      if (resData.StatusCode != 0) {
                        AppComponent.SmartAlert.Success(resData.Message);
                        AppComponent.Router.navigate(['/project/labour-work-payment-details-list']);
                      }
                      else { AppComponent.SmartAlert.Errmsg(resData.Message); }
                    });
                  }
                  resetEndDate(val) {
                    this.minDate = val;
                    if (val != undefined && val != null && this.Material.EndDate != null) {
                      if ((new Date(this.Material.EndDate).getTime()) < (new Date(val).getTime())) {
                        this.Material.EndDate = '';
                      }
                    }
                  }
                
                  ngOnDestroy() {
                    this.datashare.updateShareData(null);
                  }
                
                }
                