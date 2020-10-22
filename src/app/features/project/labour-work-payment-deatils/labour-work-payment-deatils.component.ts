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
                  public Material: any = { TypeId: '', MatId: '' };
                  public MaterialArray: any = [];LabourData:any=[];
                  public AMTypeData: any = []; project: any = {}; ProjectData: any = []; PayTData: any = []; DeliveryTData: any = []; TaxationData: any = [];
                  VendorData: any = []; ExecutiveData: any = []; AMData: any = []; filterMaterialArray: any = []; TranExists: any = [];
                  
                  constructor(private appService: AppService, private datashare: DatashareService,private allmasterService:AllmasterService,private projectService:ProjectService) {
                    this.datePickerConfig = Object.assign({}, { containerClass: 'theme-orange', maxDate: this.maxDate, dateInputFormat: 'DD-MMM-YYYY', showWeekNumbers: false, adaptivePosition: true, isAnimated: true });
                   }
                  ngOnInit() {
                    this.datashare.GetSharedData.subscribe(data => {
                      this.project = data == null ? { IsActive: 'Y', SiteId: '', ProjectExecutiveId: '', DeliveryTermId: '', ProjectId: '', PaymentTermId: '', TaxationTermId: '', VendorId: '', RefTranNo: '' } : data;
                
                      // if (this.project.TranNo != null)
                      //   this.getTranData();
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

                    this.allmasterService.getLabour('Y').subscribe((reLSData: any) => {
                      if (reLSData.StatusCode != 0) {
                        this.LabourData = reLSData.Data;console.log(this.LabourData);
                      }
                      else { this.LabourData = []; AppComponent.SmartAlert.Errmsg(reLSData.Message); }
                    });
                   
                  }

                  public onSelectSite() {
                    this.projectService.getProject(this.project.SiteId).subscribe((resSData: any) => {
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
                    obj = this.projectService.filterData(this.AMData, this.Material.MatId, 'MatActExpId');
                    this.Material.MatName = obj[0].MatName;
                    this.Material.UTotalAmount = obj[0].TotalAmount;
                    this.Material.RefTranNo = obj[0].RefTranNo;
                    this.Material.RefSrNo = obj[0].RefSrNo;
                
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

                  public onSubmit() {
                    this.loaderbtn = false;
                    this.project.Flag = this.project.TranNo == null|| this.project.TranNo == ''? 'IN' : 'UP';
                    this.project.UserCode = this.empInfo.EmpId;
                    this.project.TranNo = this.project.TranNo == null ? '' : this.project.TranNo;
                    this.project.TranSubType = 1;
                    this.project.TranType=112;
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
                