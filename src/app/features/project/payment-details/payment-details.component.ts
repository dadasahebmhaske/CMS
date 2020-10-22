import { Component, OnInit, OnDestroy } from '@angular/core';
import { DatashareService } from '../../../core/custom-services/datashare.service';
import { AppComponent } from '../../../app.component';
import { AppService } from '@app/core/custom-services/app.service';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { AllmasterService } from '@app/features/master/allmaster.service';
import { ProjectService } from '../project.service';
@Component({
  selector: 'sa-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrls: ['./payment-details.component.css']
})
export class PaymentDetailsComponent implements OnInit, OnDestroy {
  public empInfo: any;
  public datePickerConfig: Partial<BsDatepickerConfig>;
  public project: any = {};
  public loaderbtn: boolean = true;editflag;
  public InvoiceData: any = []; InvoiceArray: any[]; MaterialArray: any = []; ProjectData: any; SiteData: any = []; TranExists: any = [];
  public VendorData: any = [];
  constructor(private appService: AppService, private datashare: DatashareService, private allmasterService: AllmasterService, private projectService: ProjectService) {
    this.datePickerConfig = Object.assign({}, { containerClass: 'theme-orange', maxDate: new Date(), dateInputFormat: 'DD-MMM-YYYY', showWeekNumbers: false, adaptivePosition: true, isAnimated: true });
  }
  ngOnInit() {
    this.getAllonload();
    this.datashare.GetSharedData.subscribe(data => {
      this.project = data == null ? { IsActive: 'Y', SiteId: '', ProjectId: '', VendorId: '', RefTranNo: '',PayMode:'' } : data;
      if (this.project.TranNo != null)
       this.getTranData();
    }); this.appService.getAppData().subscribe(data => { this.empInfo = data });
  }
  public getAllonload() {
    this.allmasterService.getSite('Y').subscribe((resSData: any) => {
      if (resSData.StatusCode != 0) {
        this.SiteData = resSData.Data; 
      }
      else { this.SiteData = []; AppComponent.SmartAlert.Errmsg(resSData.Message); }
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
  public onSelectProject(RefTranNo) {
    if(this.project.TranNo==null){
      this.MaterialArray=[];
      this.project = this.projectService.calculatePOTotal(this.project, this.MaterialArray);
    }
    let tranNo = this.project.TranNo == null ? '' : this.project.TranNo;
    this.projectService.getInvoiceDeatils(tranNo, this.project.ProjectId, RefTranNo).subscribe((resData: any) => {
      if (resData.StatusCode != 0) {
        console.log(resData);
        if (RefTranNo == '') {
          this.VendorData = resData.Data.Table1;
          this.InvoiceData = resData.Data.Table2;
          if(this.project.TranNo!=null){
            this.onSelectVendor();  
        this.onSelectInvoice(); 
          }
        } else {
          if(this.editflag=='E'){
            this.VendorData = resData.Data.Table1;
            this.InvoiceData = resData.Data.Table2;
            if (this.project.TranNo != null) {
              this.onSelectVendor();
            }
            this.editflag=='z';
            }else{
              this.MaterialArray = resData.Data.Table;
            }

         
          let tempArray = [];
          for (let i = 0; i < this.MaterialArray.length; i++) {
            let Material = this.MaterialArray[i];
            Material.show = tempArray.some(obj => parseInt(obj.TypeId) === parseInt(Material.TypeId)) ? false : true;
                      tempArray.push(Material);
          }
          this.MaterialArray = tempArray;
          this.project = this.projectService.calculatePOTotal(this.project, this.MaterialArray);
          }
      }
      else { RefTranNo == '' ? (this.VendorData = this.InvoiceData = []) : this.MaterialArray = []; AppComponent.SmartAlert.Errmsg(resData.Message); }
    });
  }
  public getTranData() {
    this.editflag='E';
    this.projectService.getTransDetails(106, this.project.TranNo).subscribe((resTran: any) => {
      if (resTran.StatusCode != 0) { 
        this.TranExists = resTran.Data.Table;
       this.project = resTran.Data.Table1[0];
       this.MaterialArray = resTran.Data.Table2;
        this.onSelectSite();
       // this.onSelectProject('');
        this.onSelectProject(this.project.RefTranNo);
        this.onSelectVendor();  
        this.onSelectInvoice();    
       
  
            }
    });
  }
  onSelectVendor() {
    this.InvoiceArray = this.projectService.filterData(this.InvoiceData, this.project.VendorId, 'VendorId');
  }
  onSelectInvoice(){
    let obj;
    obj = this.projectService.filterData(this.InvoiceArray, this.project.RefTranNo, 'TranNo');
    this.project.InvoiceDate=obj[0].InvoiceDate;
    this.project.VendorInvoiceNo=obj[0].VendorInvoiceNo;
    this.project.TotAmount=obj[0].TotAmount;
  }
  public onSubmit() {
    this.loaderbtn = false;
    this.project.Flag = this.project.TranNo == null || this.project.TranNo == '' ? 'IN' : 'UP';
    this.project.UserCode = this.empInfo.EmpId;
    this.project.TranNo = this.project.TranNo == null ? '' : this.project.TranNo;
    this.project.TranSubType = 1;
    this.project.TranType = 106;
    this.project.TranDate = new Date();
    //this.project.ChallanDate= this.appService.DateToString(this.project.ChallanDate);
    //this.project.Remark = '';
    //this.project.Data = this.MaterialArray;
    let ciphertext = this.appService.getEncrypted(this.project);
    this.projectService.post('ManagePayment', ciphertext).subscribe((resData: any) => {
      this.loaderbtn = true;
      if (resData.StatusCode != 0) {
        AppComponent.SmartAlert.Success(resData.Message);
        AppComponent.Router.navigate(['/project/payment-details-list']);
      }
      else { AppComponent.SmartAlert.Errmsg(resData.Message); }
    });
  }

  ngOnDestroy() {
    this.datashare.updateShareData(null);
  }

}
