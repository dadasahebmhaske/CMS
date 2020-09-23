import { Component, OnInit } from '@angular/core';
import { IGridColumnDefs, IGridoption } from '../../../interface/igridoption';
import { AppComponent } from '../../../app.component';
import { DatashareService } from '../../../core/custom-services/datashare.service';
import { MasterService } from '../../../core/custom-services/master.service';
import { AppService } from '@app/core/custom-services/app.service';
@Component({
  selector: 'sa-generate-po-list',
  templateUrl: './generate-po-list.component.html',
  styleUrls: ['./generate-po-list.component.css']
})
export class GeneratePoListComponent implements OnInit {

              public cpInfo: any = {};
              public gridOptions: IGridoption;
              public transportData: any;
              constructor(private appService: AppService, private datashare: DatashareService, private masters: MasterService) {
              }
              ngOnInit() {
                this.appService.getAppData().subscribe(data => { this.cpInfo = data });
                this.configureGrid();
              }
              configureGrid() {
                this.gridOptions = <IGridoption>{}
                this.gridOptions.exporterMenuPdf = false;
                this.gridOptions.exporterExcelFilename = 'Transport Master list.xlsx';
                this.gridOptions.selectionRowHeaderWidth = 0;
                let columnDefs = [];
                columnDefs = [
                  {
                    name: 'Select', displayName: 'Details', cellTemplate: '<button  style="margin:3px;" class="btn-primary btn-xs"  ng-click="grid.appScope.editEmployee(row.entity)"  ng-if="row.entity.IsActive!=null">&nbsp;Acknowledge&nbsp;</button> '
                    , width: "100",
                    headerCellTemplate: '<div style="text-align: center;margin-top: 30px;">Acknowledge</div>', enableFiltering: false
                  },
                  {
                    name: 'Select1', displayName: 'Details', cellTemplate: '<button  style="margin:3px;" class="btn-success btn-xs"  ng-click="grid.appScope.editEmployee(row.entity)"  ng-if="row.entity.IsActive!=null">&nbsp;Download PO&nbsp;</button> '
                    , width: "105",
                    headerCellTemplate: '<div style="text-align: center;margin-top: 30px;">Downoad PO</div>', enableFiltering: false
                  },
                  { name: 'SiteName', displayName: 'Site Name', width: "*", cellTooltip: true, filterCellFiltered: true }, 
                  { name: 'ProjectName', displayName: 'Project Name', width: "*", cellTooltip: true, filterCellFiltered: true },
                  { name: 'Indent', displayName: 'Indent', width: "*", cellTooltip: true, filterCellFiltered: true },
                  { name: 'TotalMaterialCount', displayName: 'Total Material Count', width: "*", cellTooltip: true, filterCellFiltered: true },
                  { name: 'Amount', displayName: 'Amount', width: "*", cellTooltip: true, filterCellFiltered: true },
                  { name: 'IsActive', displayName: 'Active', width: "*", cellTooltip: true, filterCellFiltered: true },
                ]
                this.gridOptions.columnDefs = columnDefs;
                this.onLoad();

              }
              onEditFunction = ($event) => {
                this.datashare.updateShareData($event.row);
                AppComponent.Router.navigate(['/project/generate-po']);
              }
              onLoad() {
                this.transportData = [{      "SiteName":"Sanskruti",
                "ProjectName":"Samved",
                "Indent":"SANS/SAM/ID/10/09/2020",
                "TotalMaterialCount":9,
                "Amount":65200,
                "IsActive":"Y"}];
                // this.masters.getTransport().subscribe((resData: any) => {
                //   if (resData.StatusCode != 0) {
                //     this.transportData = resData.Data;
                //     AppComponent.SmartAlert.Success(resData.Message);
                //   }
                //   else { this.transportData = [{}]; AppComponent.SmartAlert.Errmsg(resData.Message); }
                // });
            
              }
            
            }
            
    