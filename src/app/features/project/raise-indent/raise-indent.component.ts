import { Component, OnInit, OnDestroy } from '@angular/core';
import { DatashareService } from '../../../core/custom-services/datashare.service';
import { AppComponent } from '../../../app.component';
import { AppService } from '@app/core/custom-services/app.service';
import { AllmasterService } from '@app/features/master/allmaster.service';
import { ProjectService } from '../project.service';
import { BsDatepickerConfig } from 'ngx-bootstrap';
@Component({
  selector: 'sa-raise-indent',
  templateUrl: './raise-indent.component.html',
  styleUrls: ['./raise-indent.component.css']
})
export class RaiseIndentComponent implements OnInit, OnDestroy {
  public empInfo: any;
  public datePickerConfig: Partial<BsDatepickerConfig>;
  public project: any = {};
  public loaderbtn: boolean = true;
  public OtherExp: Boolean = false;
  public Material: any = { TypeId: '', MatActExpId: '' };
  public AMTypeData: any = []; AMData: any = []; ExecutiveData: any;filterMaterialArray:any=[]; MaterialArray: any = []; ProjectData: any; SiteData: any;TranExists:any=[];

  constructor(private appService: AppService, private datashare: DatashareService, private allmasterService: AllmasterService, private projectService: ProjectService) { 
    this.datePickerConfig = Object.assign({}, { containerClass: 'theme-orange', minDate:  new Date(), dateInputFormat: 'DD-MMM-YYYY', showWeekNumbers: false, adaptivePosition: true, isAnimated: true });
  }
  ngOnInit() {
    this.getAllonload();
    this.datashare.GetSharedData.subscribe(data => {
      this.project = data == null ? { IsActive: 'Y', SiteId: '', ProjectExecutiveId: '', ProjectManagerId: '', ProjectId: '' } : data;
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
    // this.projectService.getAMType(2).subscribe((resMaterial: any) => {
    //   if (resMaterial.StatusCode != 0) {
    //     this.AMTypeData = resMaterial.Data; console.log(resMaterial.Data);
    //   }
    //   else { this.AMTypeData = []; AppComponent.SmartAlert.Errmsg(resMaterial.Message); }
    // });

  }
  onSelectActivityMaterial() {
    let obj;
    obj = this.projectService.filterData(this.AMTypeData, this.Material.TypeId, 'TypeId');
    this.Material.TypeName = obj[0].TypeName;
    this.Material.MainTypeId = obj[0].MainTypeId;
    this.OtherExp = obj[0].MainTypeId == 4 ? true : false;
    obj=this.projectService.filterData(this.AMData, this.Material.TypeId, 'TypeId');
    this.filterMaterialArray=obj;

  }
  public onSelectProject() {
    this.Material = { TypeId: '', MatActExpId: '' };
        this.MaterialArray=[];
    let tranNo=this.project.TranNo==null?'':this.project.TranNo;
    this.projectService.getIndentProjectExecutiveAndMaterial(tranNo,this.project.ProjectId).subscribe((resData: any) => {
      if (resData.StatusCode != 0) {
        this.ExecutiveData = resData.Data.Table;
        this.AMTypeData=resData.Data.Table1;
        this.AMData = resData.Data.Table2; 
        
      }
      else { this.ExecutiveData = []; this.AMData = []; AppComponent.SmartAlert.Errmsg(resData.Message); }
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
    obj = this.projectService.filterData(this.AMData, this.Material.MatActExpId, 'MatActExpId');
    this.Material.MatName = obj[0].MatName;
    this.Material.UOMId = obj[0].UOMId;
    this.Material.UOM = obj[0].UOM;
    if(this.Material.index==null)
    this.Material.RemainBudgetQty = obj[0].RemainBudgetQty;
    this.Material.RefTranNo = obj[0].RefTranNo;
    if(this.Material.UQty!=null && this.Material.UQty!=''){
      if(parseInt(this.Material.UQty)>parseInt(this.Material.RemainBudgetQty)){
        AppComponent.SmartAlert.Errmsg(`Quantity exceeded the balance qauntity`);
        this.Material.UQty=null;
      }
    }
  }

  addMaterial() {
    if (this.Material.index != null) {
            this.MaterialArray[this.Material.index].Qty = this.Material.UQty;
     } else if (this.MaterialArray.some(obj => (parseInt(obj.TypeId) === parseInt(this.Material.TypeId) && parseInt(obj.MatActExpId) === parseInt(this.Material.MatActExpId)))) {
      AppComponent.SmartAlert.Errmsg("Material already added in list.");
    } else {
     this.Material.Qty = this.Material.UQty;    
      this.Material.show = this.MaterialArray.some(obj => parseInt(obj.TypeId) === parseInt(this.Material.TypeId)) ? false : true;
      this.MaterialArray.push(this.Material); 
      this.MaterialArray.sort((a, b) => `${a.MainTypeId}`.localeCompare(`${b.MainTypeId}`) || a.TypeName.localeCompare(b.TypeName));
          } this.Material = { TypeId: '', MatActExpId: '' }
    this.OtherExp = false;

  }
  onRemoveMaterial(data, index) {
      this.MaterialArray.splice(index, 1);
  }
  onEdit(mat, i) {
    mat.index = i;
    this.Material = mat;
   // this.Material.URate = mat.Rate;
    this.Material.UQty = mat.Qty;
    //this.Material.UAmount = mat.Amount;
   // if (this.Material.MainTypeId == 4) { this.Material.UAmount = mat.Rate }
    this.onSelectActivityMaterial();
  }

  public getTranData() {
    this.projectService.getTransDetails(102,this.project.TranNo).subscribe((resTran: any) => {
      if (resTran.StatusCode != 0) {
        this.TranExists=resTran.Data.Table;
        this.project = resTran.Data.Table1[0]; console.log(resTran.Data);
        this.onSelectSite();
        this.onSelectProject();
        this.MaterialArray = resTran.Data.Table2;
        let tempArray = [];
        for (let i = 0; i < this.MaterialArray.length; i++) {
          this.Material = this.MaterialArray[i];
          this.Material.show = tempArray.some(obj => parseInt(obj.TypeId) === parseInt(this.Material.TypeId)) ? false : true;
          tempArray.push(this.Material);
        }
        this.MaterialArray = tempArray;
        this.Material = { TypeId: '', MatActExpId: '' }
      }
    });
  }
  public onSubmit() {
    this.loaderbtn = false;
    this.project.Flag = this.project.TranNo == null || this.project.TranNo == '' ? 'IN' : 'UP';
    this.project.TranDate = new Date();
    this.project.UserCode = this.empInfo.EmpId;
    this.project.TranNo = this.project.TranNo == null ? '' : this.project.TranNo;
    this.project.TranSubType = 1;
    this.project.TranType=102;
    this.project.RefTranNo = this.MaterialArray[0].RefTranNo;
    this.project.Data = this.MaterialArray;
    let ciphertext = this.appService.getEncrypted(this.project);
    this.projectService.post('ManageProjectIndent', ciphertext).subscribe((resData: any) => {
      this.loaderbtn = true;
      if (resData.StatusCode != 0) {
        AppComponent.SmartAlert.Success(resData.Message);
        AppComponent.Router.navigate(['/project/raise-indent-list']);
      }
      else { AppComponent.SmartAlert.Errmsg(resData.Message); }
    });
  }
  ngOnDestroy() {
    this.datashare.updateShareData(null);
    this.appService.removeBackdrop();
  }

}
