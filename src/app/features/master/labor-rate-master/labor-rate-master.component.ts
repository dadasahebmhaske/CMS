
  import { Component, OnInit } from '@angular/core';
  import { IGridColumnDefs, IGridoption } from '../../../interface/igridoption';
  import { AppComponent } from '../../../app.component';
  import { DatashareService } from '../../../core/custom-services/datashare.service';
  import { MasterService } from '../../../core/custom-services/master.service';
  import { AppService } from '@app/core/custom-services/app.service';
import { AllmasterService } from '../allmaster.service';

@Component({
  selector: 'sa-labor-rate-master',
  templateUrl: './labor-rate-master.component.html',
  styleUrls: ['./labor-rate-master.component.css']
})
export class LaborRateMasterComponent implements OnInit {
                public cpInfo: any = {};
                public gridOptions: IGridoption;
                public labourWorkData: any;
                constructor(private appService: AppService, private datashare: DatashareService, private masters: MasterService,private allmasterService:AllmasterService) {
                }
                ngOnInit() {
                  this.appService.getAppData().subscribe(data => { this.cpInfo = data });
                  this.configureGrid();
                }
                configureGrid() {
                  this.gridOptions = <IGridoption>{}
                  this.gridOptions.exporterMenuPdf = false;
                  this.gridOptions.exporterExcelFilename = 'Labour Work Master list.xlsx';
                  this.gridOptions.selectionRowHeaderWidth = 0;
                  let columnDefs = [];
                  columnDefs = [
                    {
                      name: 'Select', displayName: 'Details', cellTemplate: '<button  style="margin:3px;" class="btn-primary btn-xs"  ng-click="grid.appScope.editEmployee(row.entity)"  ng-if="row.entity.IsActive!=null">&nbsp;Edit&nbsp;</button> '
                      , width: "48",
                      headerCellTemplate: '<div style="text-align: center;margin-top: 30px;">Edit</div>', enableFiltering: false
                    },
                    { name: 'WorkName', displayName: 'Work Name', width: "*", cellTooltip: true, filterCellFiltered: true },
                    { name: 'WorkRate', displayName: 'Work Rate',cellClass:'text-right', width: "*", cellTooltip: true, filterCellFiltered: true },
                    { name: 'UOM', displayName: 'Unit', width: "*",cellClass:'text-center', cellTooltip: true, filterCellFiltered: true },
                    { name: 'TDSPercentage', displayName: 'TDS %',cellClass:'text-right', width: "*", cellTooltip: true, filterCellFiltered: true },
                    { name: 'IsActive', displayName: 'Active',cellClass:'text-center', width: "*", cellTooltip: true, filterCellFiltered: true },
                  ]
                  this.gridOptions.columnDefs = columnDefs;
                  this.onLoad();
                }
                onEditFunction = ($event) => { 
                  $event.row.UOM=  $event.row.UOMId;
                  this.datashare.updateShareData($event.row);
                  AppComponent.Router.navigate(['/master/labor-rate']);
                }
                onLoad() {
                  this.allmasterService.getlabourWork('').subscribe((resData: any) => {
                    if (resData.StatusCode != 0) {
                      this.labourWorkData = resData.Data;
                      AppComponent.SmartAlert.Success(resData.Message);
                    }
                    else { this.labourWorkData = [{}]; AppComponent.SmartAlert.Errmsg(resData.Message); }
                  });
              
                }
              
              }
              