import { Component, OnInit, OnDestroy } from '@angular/core';
import { DatashareService } from '../../../core/custom-services/datashare.service';
import { AppComponent } from '../../../app.component';
import { AppService } from '@app/core/custom-services/app.service';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { AllmasterService } from '@app/features/master/allmaster.service';
import { ProjectService } from '../project.service';
@Component({
  selector: 'sa-m-invoice-details',
  templateUrl: './m-invoice-details.component.html',
  styleUrls: ['./m-invoice-details.component.css']
})
export class MInvoiceDetailsComponent implements OnInit, OnDestroy {
  public empInfo: any;
  public datePickerConfig: Partial<BsDatepickerConfig>;
  public project: any = {};
  public loaderbtn: boolean = true;
  public GRNData: any = []; GRNArray: any[]; MaterialArray: any = []; ProjectData: any; SiteData: any = []; TranExists: any = [];
  public VendorData: any = [];
  constructor(private appService: AppService, private datashare: DatashareService, private allmasterService: AllmasterService, private projectService: ProjectService) {
    this.datePickerConfig = Object.assign({}, { containerClass: 'theme-orange', maxDate: new Date(), dateInputFormat: 'DD-MMM-YYYY', showWeekNumbers: false, adaptivePosition: true, isAnimated: true });
  }
  ngOnInit() {
    this.getAllonload();
    this.datashare.GetSharedData.subscribe(data => {
      this.project = data == null ? { IsActive: 'Y', SiteId: '', ProjectId: '',VendorId:'', RefTranNo: '' } : data;
      if (this.project.TranNo != null)
      //  this.getTranData();
    }); this.appService.getAppData().subscribe(data => { this.empInfo = data });
  }
  public getAllonload() {
    this.allmasterService.getSite('Y').subscribe((resSData: any) => {
      if (resSData.StatusCode != 0) {
        this.SiteData = resSData.Data; c
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
    let tranNo = this.project.TranNo == null ? '' : this.project.TranNo;
    this.projectService.getGRNDeatils(tranNo, this.project.ProjectId, RefTranNo).subscribe((resData: any) => {
      if (resData.StatusCode != 0) {
        console.log(resData);
        if (RefTranNo == '') {
          this.VendorData = resData.Data.Table1;
          this.GRNData = resData.Data.Table2;
        } else {
          this.MaterialArray=resData.Data.Table;
          for (let i = 0; i < this.MaterialArray.length; i++) {
            let Material = this.MaterialArray[i];
            let tempArray = [];
            Material.show = tempArray.some(obj => parseInt(obj.TypeId) === parseInt(Material.TypeId)) ? false : true;
            tempArray.push(Material);
            this.project = this.projectService.calculatePOTotal(this.project, this.MaterialArray);
          }
        }
      }
      else {RefTranNo == ''?(this.VendorData=this.GRNData=[]):this.MaterialArray=[];  AppComponent.SmartAlert.Errmsg(resData.Message); }
    });
  }
  onSelectVendor() {
    this.GRNArray = this.projectService.filterData(this.GRNData, this.project.VendorId, 'VendorId');
  }
  onRemoveMaterial(data, index) {
    this.MaterialArray.splice(index, 1);
    this.project = this.projectService.calculatePOTotal(this.project, this.MaterialArray);
}
  public onSubmit() {
    this.loaderbtn = false;
    this.project.Flag = this.project.TranNo == null || this.project.TranNo == ''? 'IN' : 'UP';
    this.project.UserCode = this.empInfo.EmpId;
    this.project.TranNo = this.project.TranNo == null ? '' : this.project.TranNo;
    this.project.TranSubType = 1;
    this.project.TranType=105;
    this.project.TranDate = new Date();
    //this.project.ChallanDate= this.appService.DateToString(this.project.ChallanDate);
    //this.project.Remark = '';
    this.project.Data = this.MaterialArray;
    let ciphertext = this.appService.getEncrypted(this.project);
    this.projectService.post('ManageInvoice', ciphertext).subscribe((resData: any) => {
      this.loaderbtn = true;
      if (resData.StatusCode != 0) {
        AppComponent.SmartAlert.Success(resData.Message);
        AppComponent.Router.navigate(['/project/m-invoice-details-list']);
      }
      else { AppComponent.SmartAlert.Errmsg(resData.Message); }
    });
  }
 
  ngOnDestroy() {
    this.datashare.updateShareData(null);
  }

}
