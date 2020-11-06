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

  constructor(private appService: AppService, private datashare: DatashareService, private allmasterService: AllmasterService, private settingService: SettingService) {
  }

  ngOnInit() {
    this.AllocationData = [{}];
    this.datashare.GetSharedData.subscribe(data => this.menu = data == null ? { DesigId: '' } : data);
    if(this.menu.DesigId!=""){
      this.onLoad(this.menu.DesigId);
    }
    this.appService.getAppData().subscribe(data => { this.empInfo = data });
    this.configureGrid();
    //this.onLoad(this.menu.DesigId);
    this.allOnloadMethods();
  }
  allOnloadMethods() {
    this.settingService.getDesignationForMenu().subscribe((resD: any) => {
      if (resD.StatusCode != 0) {
        this.designationData = resD.Data.Table;
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
        name: 'Select', displayName: 'Details', cellTemplate: `<input type="checkbox" ng-click="grid.appScope.editEmployee(row.entity)" value="" trueValue="Y" falseValue="N" name="IsAllocated" [(ngModel)]='IsAllocated'> `
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
  }
  onSelectFunction = ($event) => {
    this.selectedRows = $event.row;
    console.log($event.row);
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
    if (this.selectedRows.length > 0 && Object.keys(this.selectedRows[0]).length > 1) {
      this.loaderbtn = false;
      // this.menu.menuLThreeId = this.menu.menuLThreeId == null ? '' : this.menu.menuLThreeId;
      let data = [];
      for (let i = 0; i < this.selectedRows.length; i++) {
        data.push({
          "AllocationId": '',
          "AppId": 1001,
          "DesigId": this.menu.DesigId,
          "MenuId": this.selectedRows[i].MenuId,
          "SubMenuId": this.selectedRows[i].SubMenuId,
          "SubMenuLThreeId": this.selectedRows[i].SubMenuLThreeId,
          "IsActive": 'Y'
        });
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


