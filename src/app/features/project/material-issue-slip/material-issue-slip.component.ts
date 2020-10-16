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
  public empInfo: any; cpInfo;
  public loaderbtn: boolean = true;
  public datePickerConfig: Partial<BsDatepickerConfig>;
  public SiteData: any = [];
  public Material: any = { TypeId: '', MatId: '' };
  public MaterialArray: any = [];
  public StartMindate: Date;
  public maxDate: Date = new Date();
  public mytime: Date = new Date();
  public GRNData: any = []; GRNArray: any = [];
  public IssueSiteData: any = []; IssueProjectData: any = [];
  public other: any = { OtherExpId: '' };
  public AMTypeData: any = []; project: any = {}; transport: any = {}; ProjectData: any = []; PayTData: any = []; DeliveryTData: any = []; TaxationData: any = [];
  VendorData: any = []; ExecutiveData: any = []; AMData: any = []; filterMaterialArray: any = []; TranExists: any = [];

  constructor(private appService: AppService, private datashare: DatashareService, private allmasterService: AllmasterService, private projectService: ProjectService) {
    this.datePickerConfig = Object.assign({}, { containerClass: 'theme-orange', maxDate: this.maxDate, dateInputFormat: 'DD-MMM-YYYY', showWeekNumbers: false, adaptivePosition: true, isAnimated: true });
  }
  ngOnInit() {
    this.datashare.GetSharedData.subscribe(data => {
      this.project = data == null ? { IsActive: 'Y', SiteId: '', ProjectId: '', IssueProjectId: '', IssueSiteId: '', VendorId: '', RefTranNo: '' } : data;

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
        this.IssueSiteData = resSData.Data;
        //  this.IssueSiteData = this.projectService.filterData(this.SiteData,'N', 'IsMainSite');
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
  onSelectVendor() {
    this.GRNArray = this.projectService.filterData(this.GRNData, this.project.VendorId, 'VendorId');
  }
  public getTranData() {
    this.projectService.getTransDetails(107, this.project.TranNo).subscribe((resTran: any) => {
      if (resTran.StatusCode != 0) {
        // this.TranExists = resTran.Data.Table;
        // this.Access = this.TranExists.length == 0 ? this.project.IsApproved == 'Y' ? false : true : false;
        this.project = resTran.Data.Table1[0];
        this.project.CarryingTime = new Date(this.project.CarryingTime);
        this.onSelectSite(this.project.SiteId, 'S');
        this.onSelectSite(this.project.IssueSiteId, 'R');
        this.onSelectProject(this.project.TranNo, '');
        this.onSelectProject(this.project.TranNo, this.project.RefTranNo);
        this.onSelectVendor();
        this.MaterialArray = resTran.Data.Table2;
        let tempArray = [];
        for (let i = 0; i < this.MaterialArray.length; i++) {
          this.Material = this.MaterialArray[i];
          this.Material.show = tempArray.some(obj => parseInt(obj.TypeId) === parseInt(this.Material.TypeId)) ? false : true;

          tempArray.push(this.Material);
        }
        this.project = this.projectService.calculatePOTotal(this.project, this.MaterialArray);
        this.MaterialArray = tempArray;
        this.Material = { TypeId: '', MatId: '' }
      }
    });
  }

  public onSelectSite(id, param) {
    this.projectService.getProject(id).subscribe((resSData: any) => {
      if (resSData.StatusCode != 0) {
        if (param == 'S') {
          this.ProjectData = resSData.Data;
        }
        else {
          this.IssueProjectData = resSData.Data;
        }

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



  public onSelectProject(TranNo, RefTranNo) {
    this.MaterialArray = [];
  
    this.project.TotalAmtCost = null; this.project.TotProjectCost = null;
    this.project.TotIGSTCost = null; this.project.TotCGSTCost = null; this.project.TotSGSTCost = null;
    let tranNo = this.project.TranNo == null ? '' : this.project.TranNo;
    this.projectService.getProjectExecutiveGRNMaterial(tranNo, this.project.ProjectId, RefTranNo).subscribe((resData: any) => {
      if (resData.StatusCode != 0) {
        if (RefTranNo == '') {
          this.VendorData = resData.Data.Table1;
          this.GRNData = resData.Data.Table2;
          if (this.project.TranNo != null) {
            this.onSelectVendor();
          }
        }
        else {
          //this.MaterialArray=resData.Data.Table;
          this.AMTypeData = resData.Data.Table;
          this.AMData = resData.Data.Table1;
          for (let i = 0; i < this.MaterialArray.length; i++) {
            this.Material = this.MaterialArray[i];
            let tempArray = [];
            this.Material.show = tempArray.some(obj => parseInt(obj.TypeId) === parseInt(this.Material.TypeId)) ? false : true;
            tempArray.push(this.Material);
            this.project = this.projectService.calculatePOTotal(this.project, this.MaterialArray);
          }
          this.Material = { TypeId: '', MatId: '' }
        }
      }
      else { this.ExecutiveData = []; this.AMData = []; this.AMTypeData = []; AppComponent.SmartAlert.Errmsg(resData.Message); }
    });
  }

  onSelectMaterial() {
    let obj;
    obj = this.projectService.filterData(this.AMData, this.Material.MatId, 'MatId');
    this.Material.MatName = obj[0].MatName;
    this.Material.UOMId = obj[0].UOMId;
    this.Material.UOM = obj[0].UOM;
    this.Material.UQty = obj[0].Qty;
    // this.Material.RQty = obj[0].Qty;
    this.Material.URate = obj[0].Rate;
    this.Material.UAmount = obj[0].Amount;
    this.Material.UTotalAmount = obj[0].TotalAmount;
    this.Material.RefTranNo = obj[0].RefTranNo;
    this.Material.RefSrNo = obj[0].RefSrNo;
    this.Material.CGST = obj[0].CGST;
    this.Material.IGST = obj[0].IGST;
    this.Material.SGST = obj[0].SGST;
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
      this.Material.Rate = this.Material.URate;
      this.Material.Amount = this.Material.UAmount;

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
    if (this.project.ProjectId == this.project.IssueProjectId) {
      AppComponent.SmartAlert.Errmsg("Project and Issue Project should Not be same");
      this.project.IssueProjectId='';
    } else {
      this.loaderbtn = false;
      this.project.Flag = this.project.TranNo == null || this.project.TranNo == '' ? 'IN' : 'UP';
      this.project.UserCode = this.empInfo.EmpId;
      this.project.TranNo = this.project.TranNo == null ? '' : this.project.TranNo;
      this.project.TranSubType = 1;
      this.project.TranType = 107;
      this.project.TranDate = new Date();
      this.project.CarryingDate = this.appService.DateToString(this.project.CarryingDate);
      var d = new Date(this.project.CarryingTime);
      this.project.CarryingTime = d.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
      this.project.Remark = '';
      // this.project.RefTranNo = this.MaterialArray[0].RefTranNo;
      this.project.Data = this.MaterialArray;
      let ciphertext = this.appService.getEncrypted(this.project);
      this.projectService.post('ManageMatIssue', ciphertext).subscribe((resData: any) => {
        this.loaderbtn = true;
        if (resData.StatusCode != 0) {
          AppComponent.SmartAlert.Success(resData.Message);
          AppComponent.Router.navigate(['/project/material-issue-slip-list']);
        }
        else { this.project.CarryingTime = ''; AppComponent.SmartAlert.Errmsg(resData.Message); }
      });
    }
  }



  ngOnDestroy() {
    this.datashare.updateShareData(null);
  }

}

