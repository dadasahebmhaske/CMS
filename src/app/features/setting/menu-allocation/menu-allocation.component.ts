import { Component, OnInit } from '@angular/core';
import { IGridColumnDefs, IGridoption } from '../../../interface/igridoption';
import { AppComponent } from '../../../app.component';
import { DatashareService } from '../../../core/custom-services/datashare.service';
import { MasterService } from '../../../core/custom-services/master.service';
import { AppService } from '@app/core/custom-services/app.service';
import { SettingService } from '../setting.service';
import { AllmasterService } from '@app/features/master/allmaster.service';
@Component({
  selector: 'sa-menu-allocation',
  templateUrl: './menu-allocation.component.html',
  styleUrls: ['./menu-allocation.component.css']
})
export class MenuAllocationComponent implements OnInit {
 public DesigId:any='';
  public empInfo: any = {};
  public gridOptions: IGridoption;
  public loaderbtn:boolean=true;
  public AllocationData: any;
  public designationData:any=[];

  constructor(private appService: AppService, private datashare: DatashareService, private allmasterService: AllmasterService,private settingService:SettingService) {
  }

  ngOnInit() {
    this.appService.getAppData().subscribe(data => { this.empInfo = data });
    this.configureGrid();
    this.allOnloadMethods();
  }
  allOnloadMethods() {
        this.allmasterService.getDesignation('Y').subscribe((resD: any) => {
      if (resD.StatusCode != 0) {
        this.designationData = resD.Data;
      }
      else { this.designationData = []; AppComponent.SmartAlert.Errmsg(resD.Message); }
    });
  }
  configureGrid() {
    this.gridOptions = <IGridoption>{}
    this.gridOptions.exporterMenuPdf = false;
    this.gridOptions.exporterExcelFilename = 'Menu Allocation list.xlsx';
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
   this.onLoad('');
  }
  onEditFunction = ($event) => {
    this.datashare.updateShareData($event.row);
    AppComponent.Router.navigate(['/setting/menu-allocation-details']);
  }
    onLoad(DesigId) {
      this.settingService.getMenuAllocation(DesigId).subscribe((resData: any) => {
        if (resData.StatusCode != 0) {
          this.AllocationData = resData.Data; console.log(resData.Data);
          AppComponent.SmartAlert.Success(resData.Message);
        }
        else { this.AllocationData = [{}]; AppComponent.SmartAlert.Errmsg(resData.Message); }
      });
    }

}


