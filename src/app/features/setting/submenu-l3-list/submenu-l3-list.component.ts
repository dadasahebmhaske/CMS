import { Component, OnInit } from '@angular/core';
import { IGridColumnDefs, IGridoption } from '../../../interface/igridoption';
import { AppComponent } from '../../../app.component';
import { DatashareService } from '../../../core/custom-services/datashare.service';
import { MasterService } from '../../../core/custom-services/master.service';
import { AppService } from '@app/core/custom-services/app.service';
import { SettingService } from '../setting.service';

@Component({
  selector: 'sa-submenu-l3-list',
  templateUrl: './submenu-l3-list.component.html',
  styleUrls: ['./submenu-l3-list.component.css']
})
export class SubmenuL3ListComponent implements OnInit {

  public empInfo: any = {};
  public gridOptions: IGridoption;
  public SubMenuData: any;

  constructor(private appService: AppService, private datashare: DatashareService, private masters: MasterService,private settingService:SettingService) {
  }

  ngOnInit() {
    this.appService.getAppData().subscribe(data => { this.empInfo = data });
    this.configureGrid();
  }

  configureGrid() {
    this.gridOptions = <IGridoption>{}
    this.gridOptions.exporterMenuPdf = false;
    this.gridOptions.exporterExcelFilename = 'Designation Master list.xlsx';
    this.gridOptions.selectionRowHeaderWidth = 0;
    let columnDefs = [];
    columnDefs = [
      {
        name: 'Select', displayName: 'Details', cellTemplate: '<button  style="margin:3px;" class="btn-primary btn-xs"  ng-click="grid.appScope.editEmployee(row.entity)"  ng-if="row.entity.IsActive!=null">&nbsp;Edit&nbsp;</button> '
        , width: "48",
        headerCellTemplate: '<div style="text-align: center;margin-top: 30px;">Edit</div>', enableFiltering: false
      },
      { name: 'MenuName', displayName: 'Menu Name', width: "*", cellTooltip: true, filterCellFiltered: true },
      { name: 'SubMenuName', displayName: 'SubMenu L2 Name', width: "*", cellTooltip: true, filterCellFiltered: true },
      { name: 'SubMenuLThreeName', displayName: 'SubMenu L3 Name', width: "*", cellTooltip: true, filterCellFiltered: true },
     
       { name: 'SubMenuLThreeFlag', displayName: 'SubMenu L3 Flag', width: "200", cellTooltip: true, filterCellFiltered: true },
      { name: 'IsActive', displayName: 'Active', cellClass: 'cell-center', width: "200", cellTooltip: true, filterCellFiltered: true },
   
    ]
    this.gridOptions.columnDefs = columnDefs;
   this.onLoad();
  }
  onEditFunction = ($event) => {
    this.datashare.updateShareData($event.row);
    AppComponent.Router.navigate(['/setting/submenuL3']);
  }
    onLoad() {
      this.settingService.getSubMenuL3('').subscribe((resData: any) => {
        if (resData.StatusCode != 0) {
          this.SubMenuData = resData.Data; console.log(resData.Data);
          AppComponent.SmartAlert.Success(resData.Message);
        }
        else { this.SubMenuData = [{}]; AppComponent.SmartAlert.Errmsg(resData.Message); }
      });
    }

}


