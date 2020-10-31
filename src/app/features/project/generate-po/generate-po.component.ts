import { Component, OnInit, OnDestroy } from '@angular/core';
import { DatashareService } from '../../../core/custom-services/datashare.service';
import { AppComponent } from '../../../app.component';
import { AppService } from '@app/core/custom-services/app.service';
import { AllmasterService } from '@app/features/master/allmaster.service';
import { ProjectService } from '../project.service';
@Component({
  selector: 'sa-generate-po',
  templateUrl: './generate-po.component.html',
  styleUrls: ['./generate-po.component.css']
})
export class GeneratePoComponent implements OnInit, OnDestroy {
  public Access: boolean = true;
  public empInfo: any;
  public loaderbtn: boolean = true;
  public SiteData: any = [];
  public Material: any = { TypeId: '', MatId: '' };
  public MaterialArray: any = [];
  public OtherExpTypeData: any = [];
  public OtherExpData: any = [];
  public OtherExpenseArray: any = [];IndentArray:any=[];
  public IndentData: any = [];editflag;
  public other: any = { OtherExpId: '' };
  public AMTypeData: any = []; project: any = {}; ProjectData: any = []; PayTData: any = []; DeliveryTData: any = []; TaxationData: any = [];
  VendorData: any = []; ExecutiveData: any = []; AMData: any = []; filterMaterialArray: any = []; TranExists: any = [];
  constructor(private appService: AppService, private datashare: DatashareService, private allmasterService: AllmasterService, private projectService: ProjectService) { }
  ngOnInit() {
    this.datashare.GetSharedData.subscribe(data => {
      this.project = data == null ? { IsActive: 'Y', SiteId: '', ProjectExecutiveId: '', DeliveryTermId: '', ProjectId: '', PaymentTermId: '', TaxationTermId: '', VendorId: '', RefTranNo: '' } : data;

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
      }
      else { this.SiteData = []; AppComponent.SmartAlert.Errmsg(resSData.Message); }
    });

    this.allmasterService.getPayTerm('Y').subscribe((resPData: any) => {
      if (resPData.StatusCode != 0) {
        this.PayTData = resPData.Data;
      }
      else { this.PayTData = []; AppComponent.SmartAlert.Errmsg(resPData.Message); }
    });
    this.allmasterService.getDeliveryTerm('Y').subscribe((resDData: any) => {
      if (resDData.StatusCode != 0) {
        this.DeliveryTData = resDData.Data;
      }
      else { this.DeliveryTData = []; AppComponent.SmartAlert.Errmsg(resDData.Message); }
    });
    this.allmasterService.gettatxation('Y').subscribe((resTaxData: any) => {
      if (resTaxData.StatusCode != 0) {
        this.TaxationData = resTaxData.Data;
      }
      else { this.TaxationData = []; AppComponent.SmartAlert.Errmsg(resTaxData.Message); }
    });
    this.projectService.getVendorContractor(102).subscribe((resVData: any) => {
      if (resVData.StatusCode != 0) {
        this.VendorData = resVData.Data;
        let obj;
        obj = this.projectService.filterData(this.VendorData, 102, 'CompanyTypeId');
        this.VendorData = obj;
      }
      else { this.VendorData = []; AppComponent.SmartAlert.Errmsg(resVData.Message); }
    });

    this.projectService.getAMType(4).subscribe((resOtherExp: any) => {
      if (resOtherExp.StatusCode != 0) {
        this.OtherExpTypeData = resOtherExp.Data;
        this.onGetExpensesData();
      }
      else { AppComponent.SmartAlert.Errmsg(resOtherExp.Message); }
    });
  }

  public getTranData() {
    this.editflag='E';
    this.projectService.getTransDetails(103, this.project.TranNo).subscribe((resTran: any) => {
      if (resTran.StatusCode != 0) {
        this.TranExists = resTran.Data.Table;
        this.Access = this.TranExists.length == 0 ? this.project.IsApproved == 'Y' ? false : true : false;
        this.project = resTran.Data.Table1[0];
        this.MaterialArray = resTran.Data.Table2;
        this.OtherExpenseArray = resTran.Data.Table3;
        this.onSelectSite();
        this.onSelectProject(this.project.TranNo, '');
        this.onSelectProject(this.project.TranNo, this.project.RefTranNo);
        this.onSelectProjectExecutive();
         this.MaterialArray = resTran.Data.Table2;
       
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

  onGetExpensesData() {
    this.projectService.getAM(this.OtherExpTypeData[0].MainTypeId).subscribe((resAData: any) => {
      if (resAData.StatusCode != 0) {
        this.OtherExpData = resAData.Data.Table; 
      }
      else { this.OtherExpData = []; AppComponent.SmartAlert.Errmsg(resAData.Message); }
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
    this.Material.UOMId = obj[0].UOMId;
    this.Material.UOM = obj[0].UOM;
    this.Material.UQty = obj[0].Qty;
    this.Material.RQty = obj[0].RemainBudgetQty;
    this.Material.URate = obj[0].Rate;
    this.Material.URate = obj[0].Rate;
    this.Material.UAmount = obj[0].Amount;
    this.Material.UTotalAmount = obj[0].TotalAmount;
    this.Material.RefTranNo = obj[0].RefTranNo;
    this.Material.RefSrNo = obj[0].RefSrNo;
    // if(this.Material.index==null)
    // this.Material.RemainBudgetQty = obj[0].RemainBudgetQty;
    // this.Material.RefTranNo = obj[0].RefTranNo;
    // if(this.Material.UQty!=null && this.Material.UQty!=''){
    //   if(parseInt(this.Material.UQty)>parseInt(this.Material.RemainBudgetQty)){
    //     AppComponent.SmartAlert.Errmsg(`Quantity exceeded the balance qauntity`);
    //     this.Material.UQty=null;
    //   }
    // }
    if (this.Material.UQty != null && this.Material.URate != null) {
      this.Material.UAmount = parseFloat(this.Material.URate == undefined || this.Material.URate == '' ? 0 : this.Material.URate) * parseFloat(this.Material.UQty == undefined || this.Material.UQty == '' ? 0 : this.Material.UQty);
      this.Material.UAmount = this.Material.UAmount.toFixed(2);
    }

    this.Material.CGSTAmount = this.Material.CGSTAmount == undefined || this.Material.CGSTAmount == '' || this.Material.CGSTAmount == null ? 0 : this.Material.CGSTAmount;
    this.Material.SGSTAmount = this.Material.SGSTAmount == undefined || this.Material.SGSTAmount == '' || this.Material.SGSTAmount == null ? 0 : this.Material.SGSTAmount;
    this.Material.IGSTAmount = this.Material.IGSTAmount == undefined || this.Material.IGSTAmount == '' || this.Material.IGSTAmount == null ? 0 : this.Material.IGSTAmount;

    this.Material.IGST = this.Material.IGST == undefined || this.Material.IGST == '' || this.Material.IGST == null ? 0 : this.Material.IGST;
    this.Material.CGST = this.Material.CGST == undefined || this.Material.CGST == '' || this.Material.CGST == null ? 0 : this.Material.CGST;
    this.Material.SGST = this.Material.SGST == undefined || this.Material.SGST == '' || this.Material.SGST == null ? 0 : this.Material.SGST;

    if (this.Material.IGST == 0 || this.Material.IGST == null) {
      this.Material.CGSTAmount = 0;
      this.Material.SGSTAmount = 0;
      
      this.Material.CGSTAmount = (parseFloat(this.Material.UAmount) * parseFloat(this.Material.CGST)) / 100;
      this.Material.CGSTAmount = this.Material.CGSTAmount.toFixed(2);
      this.Material.SGSTAmount = (parseFloat(this.Material.UAmount) * parseFloat(this.Material.SGST)) / 100;
      this.Material.SGSTAmount = this.Material.SGSTAmount.toFixed(2);
      this.Material.IGSTAmount = 0;

      this.Material.UTotalAmount = parseFloat(this.Material.UAmount) + parseFloat(this.Material.CGSTAmount) + parseFloat(this.Material.SGSTAmount);
    }
    else {
      this.Material.IGSTAmount = 0;
      this.Material.IGSTAmount = (parseFloat(this.Material.UAmount) * parseFloat(this.Material.IGST)) / 100;
      this.Material.IGSTAmount = this.Material.IGSTAmount.toFixed(2);
      this.Material.UTotalAmount = parseFloat(this.Material.UAmount) + parseFloat(this.Material.IGSTAmount);
    }

  }

  GetCalculate() {
    if(parseInt(this.Material.UQty)>parseInt(this.Material.RQty)){
      AppComponent.SmartAlert.Errmsg(`Quantity exceeded the Raised qauntity`);
      this.Material.UQty=null;
    }
    if (this.Material.UQty != null && this.Material.URate != null) {
      this.Material.UAmount = parseFloat(this.Material.URate == undefined || this.Material.URate == '' ? 0 : this.Material.URate) * parseFloat(this.Material.UQty == undefined || this.Material.UQty == '' ? 0 : this.Material.UQty);
      this.Material.UAmount = this.Material.UAmount.toFixed(2);
    }

    this.Material.CGSTAmount = this.Material.CGSTAmount == undefined || this.Material.CGSTAmount == '' || this.Material.CGSTAmount == null ? 0 : this.Material.CGSTAmount;
    this.Material.SGSTAmount = this.Material.SGSTAmount == undefined || this.Material.SGSTAmount == '' || this.Material.SGSTAmount == null ? 0 : this.Material.SGSTAmount;
    this.Material.IGSTAmount = this.Material.IGSTAmount == undefined || this.Material.IGSTAmount == '' || this.Material.IGSTAmount == null ? 0 : this.Material.IGSTAmount;

    this.Material.IGST = this.Material.IGST == undefined || this.Material.IGST == '' || this.Material.IGST == null ? 0 : this.Material.IGST;
    this.Material.CGST = this.Material.CGST == undefined || this.Material.CGST == '' || this.Material.CGST == null ? 0 : this.Material.CGST;
    this.Material.SGST = this.Material.SGST == undefined || this.Material.SGST == '' || this.Material.SGST == null ? 0 : this.Material.SGST;

    if (this.Material.IGST == 0 || this.Material.IGST == null) {
      this.Material.CGSTAmount = 0;
      this.Material.SGSTAmount = 0;
      this.Material.CGSTAmount = (parseFloat(this.Material.UAmount) * parseFloat(this.Material.CGST)) / 100;
      this.Material.CGSTAmount = this.Material.CGSTAmount.toFixed(2);
      this.Material.SGSTAmount = (parseFloat(this.Material.UAmount) * parseFloat(this.Material.SGST)) / 100;
      this.Material.SGSTAmount = this.Material.SGSTAmount.toFixed(2);
      this.Material.IGSTAmount = 0;
      this.Material.UTotalAmount = parseFloat(this.Material.UAmount) + parseFloat(this.Material.CGSTAmount) + parseFloat(this.Material.SGSTAmount);
    }
    else {
      this.Material.IGSTAmount = 0;
      this.Material.IGSTAmount = (parseFloat(this.Material.UAmount) * parseFloat(this.Material.IGST)) / 100;
      this.Material.IGSTAmount = this.Material.IGSTAmount.toFixed(2);
      this.Material.SGSTAmount =0;
      this.Material.CGSTAmount=0;
      this.Material.UTotalAmount = parseFloat(this.Material.UAmount) + parseFloat(this.Material.IGSTAmount);
    }


  }

  public onSelectProject(TranNo,RefTranNo) {
    if(this.project.TranNo==null){
      this.MaterialArray=[];
      this.Material={};
      this.project = this.projectService.calculatePOTotal(this.project, this.MaterialArray);
    }
   
    this.project.TotalAmtCost=null; this.project.TotProjectCost=null;
    this.project.TotIGSTCost=null;this.project.TotCGSTCost=null;this.project.TotSGSTCost=null;
    let tranNo=this.project.TranNo==null?'':this.project.TranNo;
    this.projectService.getProjectExecutiveIndentMaterial(tranNo,this.project.ProjectId,RefTranNo).subscribe((resData: any) => {
      if (resData.StatusCode != 0) {
      if(RefTranNo==''){ 
        this.ExecutiveData = resData.Data.Table;
        this.IndentData=resData.Data.Table1;
        if (this.project.TranNo == null || this.project.TranNo == '')
        this.project.ProjectExecutiveId='';
        this.IndentData.length==0?this.IndentArray=[]:this.onSelectProjectExecutive();
        if (this.project.TranNo != null) {
          this.onSelectProjectExecutive();
        }
      }
      else{
        // this.AMTypeData=resData.Data.Table;
        // this.AMData = resData.Data.Table1; 
        // console.log(this.AMTypeData);
        // console.log(this.AMData);
        if(this.editflag=='E'){
          // this.MaterialArray=resData.Data.Table;
           this.AMTypeData = resData.Data.Table2;
           this.AMData = resData.Data.Table3;
           this.ExecutiveData = resData.Data.Table;
           this.IndentData = resData.Data.Table1;
           if (this.project.TranNo != null) {
             this.onSelectProjectExecutive();
           }
           this.editflag=='z';
           }else{
             this.AMTypeData = resData.Data.Table;
             this.AMData = resData.Data.Table1;
           }
      }
      }
      else {this.IndentArray =[];this.IndentData=[]; this.ExecutiveData = []; this.AMData = []; this.AMTypeData=[];AppComponent.SmartAlert.Errmsg(resData.Message); }
    });
  }

  onSelectProjectExecutive() {
    this.IndentArray = this.projectService.filterData(this.IndentData, this.project.ProjectExecutiveId, 'ProjectExecutiveId');
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

    } else if (this.MaterialArray.some(obj => (parseInt(obj.TypeId) === parseInt(this.Material.TypeId) && parseInt(obj.MatId) === parseInt(this.Material.MatId)))) {
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


  addOtherExpenses() {
    if (this.OtherExpenseArray.some(obj => (parseInt(obj.OtherExpId) === parseInt(this.Material.OtherExpId) && parseInt(obj.OtherExpId) === parseInt(this.Material.MatName)))) {
      AppComponent.SmartAlert.Errmsg("Expenses is already added in list.");
    } else {

      let obj;
      obj = this.projectService.filterData(this.OtherExpData, this.other.OtherExpId, 'Code');
      this.other.Name = obj[0].Name;
      this.OtherExpenseArray.push(this.other);
      // this.MaterialArray.sort((a, b) => `${a.MainTypeId}`.localeCompare(`${b.MainTypeId}`) || a.BudgetHeadTypeName.localeCompare(b.BudgetHeadTypeName));
      // this.project = this.projectService.calculatePOTotal(this.project, this.MaterialArray);
    } this.other = { OtherExpId: '' }
    //this.OtherExp = false;
  }
  onRemoveExpense(data, index) {
    this.OtherExpenseArray.splice(index, 1);
  }


  onRemoveMaterial(data, index) {
    this.MaterialArray.splice(index, 1);
  }
  onEdit(mat, i) {
    mat.index = i;
    this.Material = mat;
    this.Material.URate = mat.Rate;
    this.Material.UQty = mat.Qty;
    this.Material.RQty = mat.RemainBudgetQty;
    this.Material.UAmount = mat.Amount;
    this.Material.UTotalAmount = mat.TotalAmount;
    //this.Material.UAmount = mat.Amount;
    // if (this.Material.MainTypeId == 4) { this.Material.UAmount = mat.Rate }
    this.onSelectActivityMaterial();
  }

  public onSubmit() {
    this.loaderbtn = false;
    this.project.Flag = this.project.TranNo == null || this.project.TranNo == '' ? 'IN' : 'UP';
    this.project.UserCode = this.empInfo.EmpId;
    this.project.TranNo = this.project.TranNo == null ? '' : this.project.TranNo;
    this.project.TranSubType = 1;
    this.project.TranType = 103;
    this.project.TranDate = new Date();
    this.project.Remark = '';
    // this.project.RefTranNo = this.MaterialArray[0].RefTranNo;
    this.project.Data = this.MaterialArray;
    if(this.OtherExpenseArray.length==0){
      this.project.Data1='';
    }
    else{
      this.project.Data1 = this.OtherExpenseArray;
    }
    
    let ciphertext = this.appService.getEncrypted(this.project);
    this.projectService.post('ManagePurchaseOrder', ciphertext).subscribe((resData: any) => {
      this.loaderbtn = true;
      if (resData.StatusCode != 0) {
        AppComponent.SmartAlert.Success(resData.Message);
        AppComponent.Router.navigate(['/project/generate-po-list']);
      }
      else { AppComponent.SmartAlert.Errmsg(resData.Message); }
    });
  }
  ngOnDestroy() {
    this.datashare.updateShareData(null);
    this.appService.removeBackdrop();
  }

}
