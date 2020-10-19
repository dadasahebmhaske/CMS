import { Component, OnInit, OnDestroy } from '@angular/core';
import { DatashareService } from '../../../core/custom-services/datashare.service';
import { AppComponent } from '../../../app.component';
import { AppService } from '@app/core/custom-services/app.service';
import { AllmasterService } from '@app/features/master/allmaster.service';
import { ProjectService } from '../project.service';
import { BsDatepickerConfig } from 'ngx-bootstrap';

@Component({
  selector: 'sa-wc-payment-details',
  templateUrl: './wc-payment-details.component.html',
  styleUrls: ['./wc-payment-details.component.css']
})
export class WcPaymentDetailsComponent implements OnInit, OnDestroy {
                  public cpInfo: any;empInfo;
                  public datePickerConfig: Partial<BsDatepickerConfig>;
                  public minDate: Date;
                  public StartMindate: Date;
                  public maxDate: Date = new Date();
                  public transport: any = {RoleCode:''};
                  public loaderbtn: boolean = true;editflag;
                  public project:any={};Material:any={};CompQTY;POArray:any=[];VendorData:any=[];
                  public MaterialArray:any=[];AMTypeData:any=[];AMData:any=[];TranExists:any=[];ReceivedlocData:any=[];
                  public SiteData:any=[];InvoiceData:any=[];ProjectData:any=[];ReceivingSiteData:any=[];POData:any=[];

                   constructor(private appService: AppService, private datashare: DatashareService,private allmasterService:AllmasterService,private projectService:ProjectService) {
                      this.datePickerConfig = Object.assign({}, { containerClass: 'theme-orange', maxDate: this.maxDate, dateInputFormat: 'DD-MMM-YYYY', showWeekNumbers: false, adaptivePosition: true, isAnimated: true });
                   }

                  ngOnInit() {
                    this.datashare.GetSharedData.subscribe(data => {
                      this.project = data == null ? { IsActive: 'Y', SiteId: '',  ProjectId: '',VendorId:'',RefTranNo:'',ReceivedProjectId:'',ReceivedSiteId:''} : data;
                     
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
                      
                        this.ReceivingSiteData = this.projectService.filterData(this.SiteData, 'Y' , 'IsMainSite');
                        
                      }
                      else { this.SiteData = []; AppComponent.SmartAlert.Errmsg(resSData.Message); }
                    });
                  
                 
                    this.projectService.getVendorContractor(102).subscribe((resVData: any) => {
                      if (resVData.StatusCode != 0) {
                        this.VendorData = resVData.Data;
                        let obj;
                        obj = this.projectService.filterData(this.VendorData, 102 , 'CompanyTypeId');
                        this.VendorData = obj;
                      }
                      else { this.VendorData = []; AppComponent.SmartAlert.Errmsg(resVData.Message); }
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

                  
            public onSelectProject(RefTranNo) {
              if(this.project.TranNo==null){
                this.MaterialArray=[];
                this.Material={};
                this.project = this.projectService.calculatePOTotal(this.project, this.MaterialArray);
              }
              this.project.TotalAmtCost=null; this.project.TotProjectCost=null;
              this.project.TotIGSTCost=null;this.project.TotCGSTCost=null;this.project.TotSGSTCost=null;
              let tranNo=this.project.TranNo==null?'':this.project.TranNo;
              this.projectService.getProjectVendorPO(tranNo,this.project.ProjectId,RefTranNo).subscribe((resData: any) => {
                if (resData.StatusCode != 0) {
                if(RefTranNo==''){ 
                  this.InvoiceData = resData.Data.Table1;
                  this.POData=resData.Data.Table2;
                  if(this.project.TranNo!=null){
                    this.onSelectWorkContract(); 
                  }
                }
                else{
                  if(this.editflag=='E'){
                    this.InvoiceData = resData.Data.Table1;
                    this.POData = resData.Data.Table2;
                    if (this.project.TranNo != null) {
                      this.onSelectWorkContract();
                    }
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

            onSelectWorkContract() {
              this.POArray = this.projectService.filterData(this.POData, this.project.VendorId, 'VendorId');
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
                