import { Component, OnInit } from '@angular/core';
import { IGridColumnDefs, IGridoption } from '../../../interface/igridoption';
import { AppComponent } from '../../../app.component';
import { DatashareService } from '../../../core/custom-services/datashare.service';
import { MasterService } from '../../../core/custom-services/master.service';
import { AppService } from '@app/core/custom-services/app.service';
import { AllmasterService } from '../allmaster.service';
@Component({
  selector: 'sa-site-master',
  templateUrl: './site-master.component.html',
  styleUrls: ['./site-master.component.css']
})
export class SiteMasterComponent implements OnInit {
  
        public empInfo: any = {};
        public gridOptions: IGridoption;
        public siteData: any;
        constructor(private appService: AppService, private datashare: DatashareService, private masters: MasterService, private allmasterService:AllmasterService) {
        }
        ngOnInit() {
          this.appService.getAppData().subscribe(data => { this.empInfo = data });
          this.configureGrid();
        }
        configureGrid() {
          this.gridOptions = <IGridoption>{}
          this.gridOptions.exporterMenuPdf = false;
          this.gridOptions.exporterExcelFilename = 'Site Master list.xlsx';
          this.gridOptions.selectionRowHeaderWidth = 0;
          let columnDefs = [];
          columnDefs = [
            {
              name: 'Select', displayName: 'Details', cellTemplate: '<button  style="margin:3px;" class="btn-primary btn-xs"  ng-click="grid.appScope.editEmployee(row.entity)"  ng-if="row.entity.IsActive!=null">&nbsp;Edit&nbsp;</button> '
              , width: "48",
              headerCellTemplate: '<div style="text-align: center;margin-top: 30px;">Edit</div>', enableFiltering: false
            },
         // { name: 'VehicleTypeId', displayName: 'Vehicle Type Id', width: "*", cellTooltip: true, filterCellFiltered: true },
            { name: 'SiteName', displayName: 'Site', width: "*", cellTooltip: true, filterCellFiltered: true },
            { name: 'Address', displayName: 'Address', width: "*", cellTooltip: true, filterCellFiltered: true },
            { name: 'GeneralManagerName', displayName: 'General Manager', width: "*", cellTooltip: true, filterCellFiltered: true },
            { name: 'FirstEngineerName', displayName: 'Site Engineer 1', width: "*", cellTooltip: true, filterCellFiltered: true },
            { name: 'SecondEngineerName', displayName: 'Site Engineer 2', width: "*", cellTooltip: true, filterCellFiltered: true },
            { name: 'IsMainSite', displayName: 'Is Main Site',cellClass:'text-center', width: "*", cellTooltip: true, filterCellFiltered: true },
            { name: 'IsActive', displayName: 'Active',cellClass:'text-center', width: "*", cellTooltip: true, filterCellFiltered: true },
          ]
          this.gridOptions.columnDefs = columnDefs;
          this.onLoad();
        }
        onEditFunction = ($event) => {
          this.datashare.updateShareData($event.row);
          AppComponent.Router.navigate(['/master/site']);
        }
        onLoad() {
          this.allmasterService.getSite('').subscribe((resData: any) => {
            if (resData.StatusCode != 0) {
              this.siteData = resData.Data;
              AppComponent.SmartAlert.Success(resData.Message);
            }
            else { this.siteData = [{}]; AppComponent.SmartAlert.Errmsg(resData.Message); }
          });
      
        }
      
      }
      