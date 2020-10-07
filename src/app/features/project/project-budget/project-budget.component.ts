import { Component, OnInit, OnDestroy } from '@angular/core';
import { DatashareService } from '../../../core/custom-services/datashare.service';
import { AppComponent } from '../../../app.component';
import { AppService } from '@app/core/custom-services/app.service';
import { AllmasterService } from '@app/features/master/allmaster.service';
import { ProjectService } from '../project.service';
@Component({
  selector: 'sa-project-budget',
  templateUrl: './project-budget.component.html',
  styleUrls: ['./project-budget.component.css']
})
export class ProjectBudgetComponent implements OnInit, OnDestroy {
  public empInfo: any;
  public project: any = { };
  public loaderbtn: boolean = true;
  public OtherExp: Boolean = false;
  public Material: any = { BudgetHeadType: '', BudgetHead: '' };
  public AMTypeData: any = []; AMData: any = []; ExecutiveData: any; MaterialArray: any = []; PMData: any; ProjectData: any; SiteData: any;

  constructor(private appService: AppService, private datashare: DatashareService, private allmasterService: AllmasterService, private projectService: ProjectService) { }
  ngOnInit() {
    this.getAllonload();
    this.datashare.GetSharedData.subscribe(data => {
      this.project = data == null ? { IsActive: 'Y', SiteId: '', ProjectExecutiveId: '', ProjectManagerId: '', ProjectId: '' } : data;
      if (this.project.TranNo != null)
        this.getTranData();
    });
    this.appService.getAppData().subscribe(data => { this.empInfo = data });
  }

  public getAllonload() {
    this.allmasterService.getSite('Y').subscribe((resSData: any) => {
      if (resSData.StatusCode != 0) {
        this.SiteData = resSData.Data;
      }
      else { this.SiteData = []; AppComponent.SmartAlert.Errmsg(resSData.Message); }
    });
    this.allmasterService.getEmpByRole(2).subscribe((resData: any) => {
      if (resData.StatusCode != 0) {
        this.ExecutiveData = resData.Data;
      }
      else { this.ExecutiveData = []; AppComponent.SmartAlert.Errmsg(resData.Message); }
    });
    this.allmasterService.getEmpByRole(6).subscribe((resDat: any) => {
      if (resDat.StatusCode != 0) {
        this.PMData = resDat.Data;
      }
      else { this.PMData = []; AppComponent.SmartAlert.Errmsg(resDat.Message); }
    });
    this.projectService.getAMType(2).subscribe((resMaterial: any) => {
      if (resMaterial.StatusCode != 0) {
        this.AMTypeData = this.AMTypeData.concat(resMaterial.Data); console.log(resMaterial.Data);
      }
      else { this.AMTypeData = []; AppComponent.SmartAlert.Errmsg(resMaterial.Message); }
    });
    this.projectService.getAMType(3).subscribe((resActivity: any) => {
      if (resActivity.StatusCode != 0) {
        this.AMTypeData = this.AMTypeData.concat(resActivity.Data); console.log(resActivity.Data);
      }
      else { AppComponent.SmartAlert.Errmsg(resActivity.Message); }
    });
    this.projectService.getAMType(4).subscribe((resOtherExp: any) => {
      if (resOtherExp.StatusCode != 0) {
        this.AMTypeData = this.AMTypeData.concat(resOtherExp.Data); console.log(resOtherExp.Data);
      }
      else { AppComponent.SmartAlert.Errmsg(resOtherExp.Message); }
    });
  }
  onSelectActivityMaterial() {
    let obj;
    obj = this.projectService.filterData(this.AMTypeData, this.Material.BudgetHeadType, 'TypeId');
    this.Material.BudgetHeadTypeName = obj[0].TypeName;
    this.Material.MainTypeId = obj[0].MainTypeId;
    this.OtherExp = obj[0].MainTypeId == 4 ? true : false;
    this.projectService.getAM(obj[0].MainTypeId).subscribe((resAData: any) => {
      if (resAData.StatusCode != 0) {
        this.AMData = resAData.Data.Table; console.log(resAData.Data.Table);
      }
      else { this.AMData = []; AppComponent.SmartAlert.Errmsg(resAData.Message); }
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
  onSelectMaterial() {
    let obj;
    obj = this.projectService.filterData(this.AMData, this.Material.BudgetHead, 'Code');
    this.Material.BudgetHeadName = obj[0].Name;
    this.Material.UOMId = obj[0].UOMId;
    this.Material.UOM = obj[0].UOM;
    if (this.Material.UQty != null && this.Material.URate != null) {
      this.Material.UAmount = parseFloat(this.Material.URate == undefined || this.Material.URate == '' ? 0 : this.Material.URate) * parseFloat(this.Material.UQty == undefined || this.Material.UQty == '' ? 0 : this.Material.UQty);
      this.Material.UAmount = this.Material.UAmount.toFixed(2);
    }
  }

  addMaterial() {
    if (this.Material.index != null) {
      this.MaterialArray[this.Material.index].Rate = this.Material.URate;
      this.MaterialArray[this.Material.index].Qty = this.Material.UQty;
      this.MaterialArray[this.Material.index].Amount = this.Material.UAmount;
      if ( this.MaterialArray[this.Material.index].MainTypeId == 4) {
        this.MaterialArray[this.Material.index].Rate = this.MaterialArray[this.Material.index].Amount
      }
      this.project = this.projectService.calculateTotal(this.project, this.MaterialArray);
    } else if (this.MaterialArray.some(obj => (parseInt(obj.BudgetHeadType) === parseInt(this.Material.BudgetHeadType) && parseInt(obj.BudgetHead) === parseInt(this.Material.BudgetHead)))) {
      AppComponent.SmartAlert.Errmsg("Material / Activity is already added in list.");
    } else {
      this.Material.Rate = this.Material.URate; this.Material.Qty = this.Material.UQty; this.Material.Amount = this.Material.UAmount;
      if (this.Material.MainTypeId == 4) {
        this.Material.Rate = this.Material.Amount;
      
      }
      this.Material.show = this.MaterialArray.some(obj => parseInt(obj.BudgetHeadType) === parseInt(this.Material.BudgetHeadType)) ? false : true;
      this.MaterialArray.push(this.Material); console.log(this.MaterialArray);
      this.MaterialArray.sort((a, b) => `${a.MainTypeId}`.localeCompare(`${b.MainTypeId}`) || a.BudgetHeadTypeName.localeCompare(b.BudgetHeadTypeName));
      this.project = this.projectService.calculateTotal(this.project, this.MaterialArray);
    } this.Material = { BudgetHeadType: '', BudgetHead: '' }
    this.OtherExp = false;

  }
  onRemoveMaterial(data, index) {
    // if (data.OrderCode != '') {
    //   data.IsActive = 'N';
    //   this.removeProductUpdate.push(data);
    // }
    this.MaterialArray.splice(index, 1);
    this.project = this.projectService.calculateTotal(this.project, this.MaterialArray);
  }
  onEdit(mat, i) {
    mat.index = i;
    this.Material = mat;
    this.Material.URate = mat.Rate;
    this.Material.UQty = mat.Qty;
    this.Material.UAmount = mat.Amount;
    if(this.Material.MainTypeId==4){this.Material.UAmount =mat.Rate }
    this.onSelectActivityMaterial();
  }

  public getTranData() {
    this.projectService.getTransDetails(101,this.project.TranNo).subscribe((resTran: any) => {
      if (resTran.StatusCode != 0) {
        let amt = this.project.TotProjectCost;
        this.project = resTran.Data.Table1[0];
        this.project.TotProjectCost = amt;
        this.onSelectSite();
        this.MaterialArray = resTran.Data.Table2;
        let tempArray = [];
        for (let i = 0; i < this.MaterialArray.length; i++) {
          this.Material = this.MaterialArray[i];
          this.Material.show = tempArray.some(obj => parseInt(obj.BudgetHeadType) === parseInt(this.Material.BudgetHeadType)) ? false : true;
          tempArray.push(this.Material);
        }
        this.MaterialArray = tempArray;
        this.Material = { BudgetHeadType: '', BudgetHead: '' }
      }
    });
  }
  public onSubmit() {
    this.loaderbtn = false;
    this.project.Flag = this.project.TranNo == null ? 'IN' : 'UP';
    this.project.TranDate = new Date();
    this.project.UserCode = this.empInfo.EmpId;
    this.project.TranNo = this.project.TranNo == null ? '' : this.project.TranNo;
    this.project.ProjectStatus = 1;
    //this.project.ProjectExecutiveId = 11;
    this.project.Data = this.MaterialArray;
    let ciphertext = this.appService.getEncrypted(this.project);
    this.projectService.post('ManageProjectBudget', ciphertext).subscribe((resData: any) => {
      this.loaderbtn = true;
      if (resData.StatusCode != 0) {
        AppComponent.SmartAlert.Success(resData.Message);
        AppComponent.Router.navigate(['/project/project-budget-list']);
      }
      else { AppComponent.SmartAlert.Errmsg(resData.Message); }
    });
  }
  ngOnDestroy() {
    this.datashare.updateShareData(null);
  }

}
