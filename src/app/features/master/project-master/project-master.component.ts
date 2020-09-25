import { Component, OnInit } from '@angular/core';
import { IGridColumnDefs, IGridoption } from '../../../interface/igridoption';
import { AppComponent } from '../../../app.component';
import { DatashareService } from '../../../core/custom-services/datashare.service';
import { MasterService } from '../../../core/custom-services/master.service';
import { AppService } from '@app/core/custom-services/app.service';
import { AllmasterService } from '../allmaster.service';
@Component({
  selector: 'sa-project-master',
  templateUrl: './project-master.component.html',
  styleUrls: ['./project-master.component.css']
})
export class ProjectMasterComponent implements OnInit {
    
          public cpInfo: any = {};
          public gridOptions: IGridoption;
          public projectData: any;
          constructor(private appService: AppService, private datashare: DatashareService, private masters: MasterService,private allmasterService:AllmasterService) {
          }
          ngOnInit() {
            this.appService.getAppData().subscribe(data => { this.cpInfo = data });
            this.configureGrid();
          }
          configureGrid() {
            this.gridOptions = <IGridoption>{}
            this.gridOptions.exporterMenuPdf = false;
            this.gridOptions.exporterExcelFilename = 'Project Master list.xlsx';
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
              { name: 'NoOfUnits', displayName: 'No. Of Units',cellClass: 'cell-right', width: "*", cellTooltip: true, filterCellFiltered: true },
              { name: 'StartDate', displayName: 'Start Date',cellClass: 'cell-center', width: "*", cellTooltip: true, filterCellFiltered: true },
              
              { name: 'EndDate', displayName: 'End Date',cellClass: 'cell-center', width: "*", cellTooltip: true, filterCellFiltered: true },
              { name: 'IsActive', displayName: 'Active', width: "*", cellTooltip: true, filterCellFiltered: true },
            ]
            this.gridOptions.columnDefs = columnDefs;
            this.onLoad();
          }
          onEditFunction = ($event) => {
            this.datashare.updateShareData($event.row);
            AppComponent.Router.navigate(['/master/project']);
          }
          onLoad() {
            this.allmasterService.getProject().subscribe((resData: any) => {
              if (resData.StatusCode != 0) {
                this.projectData = resData.Data;
                AppComponent.SmartAlert.Success(resData.Message);
              }
              else { this.projectData = [{}]; AppComponent.SmartAlert.Errmsg(resData.Message); }
            });
        
          }
        
        }
        