import { Component, OnInit, OnDestroy } from '@angular/core';
import { DatashareService } from '../../../core/custom-services/datashare.service';
import { AppComponent } from '../../../app.component';
import { AppService } from '@app/core/custom-services/app.service';
import { AllmasterService } from '@app/features/master/allmaster.service';
import { ProjectService } from '../project.service';
import { BsDatepickerConfig } from 'ngx-bootstrap';
@Component({
  selector: 'sa-weekly-payout',
  templateUrl: './weekly-payout.component.html',
  styleUrls: ['./weekly-payout.component.css']
})
export class WeeklyPayoutComponent implements OnInit, OnDestroy {
                    public cpInfo: any;empInfo;
                    public datePickerConfig: Partial<BsDatepickerConfig>;
                    public minDate: Date;
                    public StartMindate: Date;
                    public maxDate: Date = new Date();
                    public WorkContractData:any=[];WorkLabourD:any=[];
                    public loaderbtn: boolean = true;editflag;AMTypeData:any=[];AMData:any=[];
                    public project:any={};Material:any={};MaterialArray:any=[];PayTData:any=[];filterMaterialArray:any=[];
                    public SiteData:any=[];VendorData:any=[];ProjectData:any=[];LabourWork:any=[];ContractorData:any=[];

                    constructor(private appService: AppService, private datashare: DatashareService,private allmasterService:AllmasterService,private projectService:ProjectService) {
                      this.datePickerConfig = Object.assign({}, { containerClass: 'theme-orange', maxDate: this.maxDate, dateInputFormat: 'DD-MMM-YYYY', showWeekNumbers: false, adaptivePosition: true, isAnimated: true });
                    }
                    ngOnInit() {
                      this.datashare.GetSharedData.subscribe(data => {
                        this.project = data == null ? { IsActive: 'Y', SiteId: '',  ProjectId: '',RefTranNo:''} : data;
                       
                        // if (this.project.TranNo != null)
                        //  this.getTranData();
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
                    }

                    public getTranData() {
                      this.editflag='E';
                      this.projectService.getTransDetails(113, this.project.TranNo).subscribe((resTran: any) => {
                        if (resTran.StatusCode != 0) {
                         this.project = resTran.Data.Table1[0];
                          this.MaterialArray = resTran.Data.Table2;
                          this.onSelectSite(this.project.SiteId);
                        this.onSelectProject('');
                        this.onSelectProject(this.project.RefTranNo);
                         
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

                    public onSelectSite(id) {
                      this.projectService.getProject(id).subscribe((resSData: any) => {
                        if (resSData.StatusCode != 0) {
                            this.ProjectData = resSData.Data;
                        }
                        else { this.ProjectData = []; AppComponent.SmartAlert.Errmsg(resSData.Message); }
                      });
                    }

                    public onSelectProject(RefTranNo) {
                      if(this.project.TranNo==null){
                        this.MaterialArray=[];
                        this.project = this.projectService.calculatePOTotal(this.project, this.MaterialArray);
                      }
                      // this.project.TotalAmtCost=null; this.project.TotProjectCost=null;
                      // this.project.TotIGSTCost=null;this.project.TotCGSTCost=null;this.project.TotSGSTCost=null;
                     
                      let tranNo=this.project.TranNo==null?'':this.project.TranNo;
                      this.projectService.getDWworklabour(tranNo,this.project.ProjectId,RefTranNo).subscribe((resData: any) => {
                        if (resData.StatusCode != 0) {
                        if(RefTranNo==''){ 
                         // this.VendorData = resData.Data.Table1;
                          this.WorkLabourD=resData.Data.Table1;
                          // if(this.project.TranNo!=null){
                          //   this.onSelectVendor(); 
                          // }
                        }
                        else{
                          if(this.editflag=='E'){
                           // this.VendorData = resData.Data.Table1;
                            this.WorkLabourD = resData.Data.Table1;
                            // if (this.project.TranNo != null) {
                            //   this.onSelectVendor();
                            // }
                            this.editflag=='z';
                            }else{
                              this.MaterialArray = resData.Data.Table;
                            }
                          //this.MaterialArray=resData.Data.Table;
                          for (let i = 0; i < this.MaterialArray.length; i++) {
                            this.Material = this.MaterialArray[i];
                            let tempArray = [];
                            this.Material.show = tempArray.some(obj => parseInt(obj.TypeId) === parseInt(this.Material.TypeId)) ? false : true;
                            tempArray.push(this.Material);
                            this.project = this.projectService.calculatePOTotal(this.project, this.MaterialArray);
                          }
                         // this.Material.show = this.MaterialArray.some(obj => parseInt(obj.TypeId) === parseInt(this.Material.TypeId)) ? false : true;
        
                          //this.AMData = resData.Data.Table1; 
                          console.log(this.AMTypeData);
                          console.log(this.AMData);
                        }
                        }
                        else { this.VendorData = []; this.AMData = []; this.AMTypeData=[];AppComponent.SmartAlert.Errmsg(resData.Message); }
                      });
                    }

                 
                    public onSubmit() {
                      this.loaderbtn = false;
                      this.project.Flag = this.project.TranNo == null|| this.project.TranNo == ''? 'IN' : 'UP';
                      this.project.UserCode = this.empInfo.EmpId;
                      this.project.TranNo = this.project.TranNo == null ? '' : this.project.TranNo;
                      this.project.TranSubType = 1;
                      this.project.TranType=113;
                      this.project.TranDate = new Date();
                      this.project.ChallanDate= this.appService.DateToString(this.project.ChallanDate);
                      this.project.Remark = '';
                     // this.project.RefTranNo = this.MaterialArray[0].RefTranNo;
                      this.project.Data = this.MaterialArray;
                      let ciphertext = this.appService.getEncrypted(this.project);
                      this.projectService.post('ManageLabourPaymentList', ciphertext).subscribe((resData: any) => {
                        this.loaderbtn = true;
                        if (resData.StatusCode != 0) {
                          AppComponent.SmartAlert.Success(resData.Message);
                          AppComponent.Router.navigate(['/project/grn-list']);
                        }
                        else { AppComponent.SmartAlert.Errmsg(resData.Message); }
                      });
                    }


                    ngOnDestroy() {
                      this.datashare.updateShareData(null);
                    }
                  
                  }
                  