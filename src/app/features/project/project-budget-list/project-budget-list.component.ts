import { Component, OnInit } from '@angular/core';
import { IGridColumnDefs, IGridoption } from '../../../interface/igridoption';
import { AppComponent } from '../../../app.component';
import { DatashareService } from '../../../core/custom-services/datashare.service';
import { MasterService } from '../../../core/custom-services/master.service';
import { AppService } from '@app/core/custom-services/app.service';
import { ProjectService } from '../project.service';
@Component({
  selector: 'sa-project-budget-list',
  templateUrl: './project-budget-list.component.html',
  styleUrls: ['./project-budget-list.component.css']
})
export class ProjectBudgetListComponent implements OnInit {
          public cpInfo: any = {};
          public gridOptions: IGridoption;
          public projectBudgetData: any;
          constructor(private appService: AppService, private datashare: DatashareService, private masters: MasterService,private projectService:ProjectService) {
          }
          ngOnInit() {
            this.appService.getAppData().subscribe(data => { this.cpInfo = data });
            this.configureGrid();
          }
          configureGrid() {
            this.gridOptions = <IGridoption>{}
            this.gridOptions.exporterMenuPdf = false;
            this.gridOptions.exporterExcelFilename = 'Project Budget list.xlsx';
            this.gridOptions.selectionRowHeaderWidth = 0;
            let columnDefs = [];
            columnDefs = [
              {
                name: 'Select', displayName: 'Details', cellTemplate: '<button  style="margin:3px;" class="btn-primary btn-xs"  ng-click="grid.appScope.editEmployee(row.entity)"  ng-if="row.entity.IsActive!=null">&nbsp;Edit&nbsp;</button> '
                , width: "48",
                headerCellTemplate: '<div style="text-align: center;margin-top: 30px;">Edit</div>', enableFiltering: false
              },
              { name: 'SiteName', displayName: 'Site Name', width: "*", cellTooltip: true, filterCellFiltered: true },
              { name: 'ProjectName', displayName: 'Project Name', width: "*", cellTooltip: true, filterCellFiltered: true },
              { name: 'ManagerName', displayName: 'Manager Name', width: "*", cellTooltip: true, filterCellFiltered: true },
              { name: 'ExecutiveName', displayName: 'Executive Name', width: "*", cellTooltip: true, filterCellFiltered: true },
              { name: 'TotProjectCost', displayName: 'Project Cost',cellClass:'text-right', width: "*", cellTooltip: true, filterCellFiltered: true },
              { name: 'DispTranNo', displayName: 'Trans No.',cellClass:'text-center', width: "*", cellTooltip: true, filterCellFiltered: true },
              { name: 'TranDate', displayName: 'Tran Date',cellClass:'text-center', width: "*", cellTooltip: true, filterCellFiltered: true },
              //{ name: 'IsActive', displayName: 'Active', width: "*", cellTooltip: true, filterCellFiltered: true },
            ]
            this.gridOptions.columnDefs = columnDefs;
            this.onLoad();
          }
          onEditFunction = ($event) => {
            this.datashare.updateShareData($event.row);
            AppComponent.Router.navigate(['/project/project-budget']);
          }
          onLoad() {
            this.projectService.getProjectBudgetlist().subscribe((resData: any) => {
              if (resData.StatusCode != 0) {
                this.projectBudgetData = resData.Data.Table; console.log( resData.Data);
                AppComponent.SmartAlert.Success(resData.Message);
              }
              else { this.projectBudgetData = [{}]; AppComponent.SmartAlert.Errmsg(resData.Message); }
            });
        
          }
        
        }
        
