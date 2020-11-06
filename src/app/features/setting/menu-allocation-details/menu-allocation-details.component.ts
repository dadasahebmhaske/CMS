import { Component, OnInit } from '@angular/core';
import { IGridColumnDefs, IGridoption } from '../../../interface/igridoption';
import { AppComponent } from '../../../app.component';
import { DatashareService } from '../../../core/custom-services/datashare.service';
import { MasterService } from '../../../core/custom-services/master.service';
import { AppService } from '@app/core/custom-services/app.service';
import { SettingService } from '../setting.service';
import { AllmasterService } from '@app/features/master/allmaster.service';
@Component({
  selector: 'sa-menu-allocation-details',
  templateUrl: './menu-allocation-details.component.html',
  styleUrls: ['./menu-allocation-details.component.css']
})
export class MenuAllocationDetailsComponent implements OnInit {
  public menu: any = {};
  public empInfo: any = {};
  public gridOptions: IGridoption;
  public loaderbtn: boolean = true;
  public AllocationData: any;
  public designationData: any = [];
  public selectedRows: any = [];
  public Emenu:any={};

  constructor(private appService: AppService, private datashare: DatashareService, private allmasterService: AllmasterService, private settingService: SettingService) {
  }

  ngOnInit() {
    this.AllocationData = [{}];
    this.datashare.GetSharedData.subscribe(data => this.menu = data == null ? { DesigId: '' } : data);
    this.allOnloadMethods();
   if(this.menu.DesigId!="" && this.menu.DesigId!=null){
    
    this.onLoad(this.menu.DesigId);
   }
    this.appService.getAppData().subscribe(data => { this.empInfo = data });
    this.configureGrid();
    //this.onLoad(this.menu.DesigId);
    //this.allOnloadMethods();
  }
  allOnloadMethods() {
    this.settingService.getDesignationForMenu(this.menu.DesigId).subscribe((resD: any) => {
      if (resD.StatusCode != 0) {
        this.designationData = resD.Data.Table;
      //   if(this.menu.DesigId!=""){
      //   this.designationData.push({
      //     "DesigId": this.menu.DesigId,
      //     "DesigName":this.menu.DesigName,
      //     "IsActive":'Y',
      //   });
      // }
        console.log( this.designationData);
      }
      else { this.designationData = []; AppComponent.SmartAlert.Errmsg(resD.Message); }
    });
  }
  configureGrid() {
    this.gridOptions = <IGridoption>{}
    this.gridOptions.exporterMenuPdf = false;
    this.gridOptions.exporterExcelFilename = 'Menu Allocation list.xlsx';
    this.gridOptions.multiSelect = false;
    this.gridOptions.enableRowSelection = false;
    this.gridOptions.enableSelectAll = false;
    this.gridOptions.enableRowHeaderSelection = false;
    this.gridOptions.selectionRowHeaderWidth = 0;
    let columnDefs = [];
    columnDefs = [
      // {
      //   name: 'Select', displayName: 'Details', cellTemplate: '<button  style="margin:3px;" class="btn-primary btn-xs"  ng-click="grid.appScope.editEmployee(row.entity)"  ng-if="row.entity.IsActive!=null">&nbsp;Edit&nbsp;</button> '
      //   , width: "48",
      //   headerCellTemplate: '<div style="text-align: center;margin-top: 30px;">Edit</div>', enableFiltering: false
      // },
      {
        name: 'Select', displayName: 'Details', cellTemplate: `<input type="checkbox" ng-click="grid.appScope.editEmployee(row.entity)" ng-true-value="'Y'" ng-false-value="'N'" name="IsAllocated" ng-model='row.entity.IsAllocated' ng-if="row.entity.IsAllocated!=null" > `
        , width: "48",
        headerCellTemplate: '<div style="text-align: center;margin-top: 0;">Edit</div>', enableFiltering: false
      },
      { name: 'LevelOneMenu', displayName: 'Main Menu L1', width: "*", cellTooltip: true, filterCellFiltered: true },
      { name: 'LevelTwoMenu', displayName: 'Sub Menu L2', width: "*", cellTooltip: true, filterCellFiltered: true },
      { name: 'menuLThreeName', displayName: 'Sub MenuL3', width: "*", cellTooltip: true, filterCellFiltered: true },
      { name: 'IsAllocated', displayName: 'Is Allocated', width: "*", cellTooltip: true, filterCellFiltered: true },
      { name: 'MenuFlag', displayName: 'Menu Flag', width: "200", cellTooltip: true, filterCellFiltered: true },
     // { name: 'IsActive', displayName: 'Active', cellClass: 'cell-center', width: "200", cellTooltip: true, filterCellFiltered: true },

    ]
    this.gridOptions.columnDefs = columnDefs;
   // this.onLoad(this.menu.DesigId);
  }
  onEditFunction = ($event) => {
   // this.datashare.updateShareData($event.row);
   this.selectedRows = $event.row;
   console.log($event.row);
   console.log(this.AllocationData);
  }
  onSelectFunction = ($event) => {
    //this.selectedRows = $event.row;
    // console.log($event.row);
  }

  onLoad(DesigId) {
    this.settingService.getMenuAllMenu(this.menu.DesigId).subscribe((resData: any) => {
      if (resData.StatusCode != 0) {
        this.AllocationData = resData.Data.Table; console.log(resData.Data);
        AppComponent.SmartAlert.Success(resData.Message);
      }
      else { this.AllocationData = []; AppComponent.SmartAlert.Errmsg(resData.Message); }
    });
  }
  public onSubmit() {
    if (this.AllocationData.some(obj=>obj.IsAllocated==='Y')) {
      this.loaderbtn = false;
     
      let data = [];
      for (let i = 0; i < this.AllocationData.length; i++) {
        if(this.AllocationData[i].IsAllocated=='Y'){
        data.push({
          "AllocationId": '',
          "IsAllocated":'Y',
          "AppId": 1001,
          "DesigId": this.menu.DesigId,
          "MenuId": this.AllocationData[i].MenuId,
          "SubMenuId": this.AllocationData[i].SubMenuId,
          "SubMenuLThreeId": this.AllocationData[i].SubMenuLThreeId,
          "IsActive": 'Y'
        });
      }
    }

      this.menu.data=data;
      this.menu.Flag = 'IN';
      this.menu.UserCode = this.empInfo.EmpId;
      // this.menu.AppId = 1001;

      let ciphertext = this.appService.getEncrypted(this.menu);
      this.settingService.post('/Settings/ManageMenuAllocation', ciphertext).subscribe((resData: any) => {
        this.loaderbtn = true;
        if (resData.StatusCode != 0) {
          AppComponent.SmartAlert.Success(resData.Message);
          AppComponent.Router.navigate(['/setting/menu-allocation']);
        }
        else { AppComponent.SmartAlert.Errmsg(resData.Message); }
      });

    } else {
      AppComponent.SmartAlert.Errmsg(`Please select atleast one menu`);
    }
  }
  ngOnDestroy() {
    this.datashare.updateShareData(null);
  }
}


