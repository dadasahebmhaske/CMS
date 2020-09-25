import { Component, OnInit } from '@angular/core';
import { IGridColumnDefs, IGridoption } from '../../../interface/igridoption';
import { AppComponent } from '../../../app.component';
import { DatashareService } from '../../../core/custom-services/datashare.service';
import { MasterService } from '../../../core/custom-services/master.service';
import { AppService } from '@app/core/custom-services/app.service';
import { AllmasterService } from '../allmaster.service';
@Component({
  selector: 'sa-designation-master',
  templateUrl: './designation-master.component.html',
  styleUrls: ['./designation-master.component.css']
})
export class DesignationMasterComponent implements OnInit {

      public empInfo: any = {};
      public gridOptions: IGridoption;
      public designationData: any;
      constructor(private appService: AppService, private datashare: DatashareService, private masters: MasterService,private allmasterService:AllmasterService) {
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
          { name: 'DesigId', displayName: 'Designation Id', width: "*", cellTooltip: true, filterCellFiltered: true },
          { name: 'DesigName', displayName: 'Designation', width: "*", cellTooltip: true, filterCellFiltered: true },
          { name: 'IsActive', displayName: 'Active', width: "*", cellTooltip: true, filterCellFiltered: true },
        ]
        this.gridOptions.columnDefs = columnDefs;
        this.onLoad();
      }
      onEditFunction = ($event) => {
        this.datashare.updateShareData($event.row);
        AppComponent.Router.navigate(['/master/designation']);
      }
      onLoad() {
        this.allmasterService.getDesignation().subscribe((resData: any) => {
          if (resData.StatusCode != 0) {
            this.designationData = resData.Data; console.log(resData.Data);
            AppComponent.SmartAlert.Success(resData.Message);
          }
          else { this.designationData = [{}]; AppComponent.SmartAlert.Errmsg(resData.Message); }
        });
    
      }
    
    }
    