import { Component, OnInit, OnDestroy } from '@angular/core';
import { DatashareService } from '../../../core/custom-services/datashare.service';
import { AppComponent } from '../../../app.component';
import { AppService } from '@app/core/custom-services/app.service';
import { AllmasterService } from '@app/features/master/allmaster.service';
import { ProjectService } from '../project.service';
import { BsDatepickerConfig } from 'ngx-bootstrap';

@Component({
  selector: 'sa-grn',
  templateUrl: './grn.component.html',
  styleUrls: ['./grn.component.css']
})
export class GrnComponent implements OnInit, OnDestroy {
            public cpInfo: any;empInfo;
            public datePickerConfig: Partial<BsDatepickerConfig>;
            public minDate: Date;
            public StartMindate: Date;
            public maxDate: Date = new Date();
            public transport: any = {RoleCode:''};
            public loaderbtn: boolean = true;
            public project:any={};Material:any={};
            public MaterialArray:any=[];AMTypeData:any=[];AMData:any=[];

            public SiteData:any=[];VendorData:any=[];ProjectData:any=[];ReceivingSiteData:any=[];POData:any=[];
            constructor(private appService: AppService, private datashare: DatashareService,private allmasterService:AllmasterService,private projectService:ProjectService) {
              this.datePickerConfig = Object.assign({}, { containerClass: 'theme-orange', maxDate: this.maxDate, dateInputFormat: 'DD-MMM-YYYY', showWeekNumbers: false, adaptivePosition: true, isAnimated: true });
             }
            ngOnInit() {
              this.datashare.GetSharedData.subscribe(data => {
                this.project = data == null ? { IsActive: 'Y', SiteId: '', ProjectExecutiveId: '', DeliveryTermId: '', ProjectId: '' ,PaymentTermId:'',TaxationTermId:'',VendorId:'',RefTranNo:''} : data;
               
                // if (this.project.TranNo != null)
                //  this.getTranData();
              }); 
              this.appService.getAppData().subscribe(data => { this.empInfo = data });

              this.getAllonload();
              this.datashare.GetSharedData.subscribe(data => this.transport = data == null ? { IsActive: 'Y',TaxationTermId:'',PaymentTermId:'',DeliveryTermId:'',SiteId:'',PManageId:'',ProjectId:'',MaterialId:'',MaterialTypeId:'',RoleCode:'',RateType:'' } :{ IsActive: 'Y',TaxationTermId:'',PaymentTermId:'',DeliveryTermId:'',SiteId:'',PManageId:'',ProjectId:'',MaterialId:'',MaterialTypeId:'',RoleCode:'',RateType:'' });
              this.appService.getAppData().subscribe(data => { this.empInfo = data });
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

            public onSelectProject(RefTranNo) {
              this.MaterialArray=[];
              this.project.TotalAmtCost=null; this.project.TotProjectCost=null;
              this.project.TotIGSTCost=null;this.project.TotCGSTCost=null;this.project.TotSGSTCost=null;
              let tranNo=this.project.TranNo==null?'':this.project.TranNo;
              this.projectService.getProjectVendorPO(tranNo,this.project.ProjectId,RefTranNo).subscribe((resData: any) => {
                if (resData.StatusCode != 0) {
                if(RefTranNo==''){ 
                  this.VendorData = resData.Data.Table1;
                  this.POData=resData.Data.Table2;
                }
                else{
                  this.MaterialArray=resData.Data.Table;
                  for (let i = 0; i < this.MaterialArray.length; i++) {
                    this.Material = this.MaterialArray[i];
                    let tempArray = [];
                    this.Material.show = tempArray.some(obj => parseInt(obj.TypeId) === parseInt(this.Material.TypeId)) ? false : true;
                    tempArray.push(this.Material);
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

            public onSelectSite() {
              this.projectService.getProject(this.project.SiteId).subscribe((resSData: any) => {
                if (resSData.StatusCode != 0) {
                  this.ProjectData = resSData.Data;
                }
                else { this.ProjectData = []; AppComponent.SmartAlert.Errmsg(resSData.Message); }
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
          