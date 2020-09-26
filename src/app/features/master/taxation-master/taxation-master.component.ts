import { Component, OnInit } from '@angular/core';
import { IGridColumnDefs, IGridoption } from '../../../interface/igridoption';
import { AppComponent } from '../../../app.component';
import { DatashareService } from '../../../core/custom-services/datashare.service';
import { MasterService } from '../../../core/custom-services/master.service';
import { AppService } from '@app/core/custom-services/app.service';
import { AllmasterService } from '../allmaster.service';
@Component({
  selector: 'sa-taxation-master',
  templateUrl: './taxation-master.component.html',
  styleUrls: ['./taxation-master.component.css']
})
export class TaxationMasterComponent implements OnInit {

                public empInfo: any = {};
                public gridOptions: IGridoption;
                public taxationData: any;
                constructor(private appService: AppService, private datashare: DatashareService, private masters: MasterService,private allmasterService:AllmasterService) {
                }
                ngOnInit() {
                  this.appService.getAppData().subscribe(data => { this.empInfo = data });
                  this.configureGrid();
                }
                configureGrid() {
                  this.gridOptions = <IGridoption>{}
                  this.gridOptions.exporterMenuPdf = false;
                  this.gridOptions.exporterExcelFilename = 'Taxation Master list.xlsx';
                  this.gridOptions.selectionRowHeaderWidth = 0;
                  let columnDefs = [];
                  columnDefs = [
                    {
                      name: 'Select', displayName: 'Details', cellTemplate: '<button  style="margin:3px;" class="btn-primary btn-xs"  ng-click="grid.appScope.editEmployee(row.entity)"  ng-if="row.entity.IsActive!=null">&nbsp;Edit&nbsp;</button> '
                      , width: "48",
                      headerCellTemplate: '<div style="text-align: center;margin-top: 30px;">Edit</div>', enableFiltering: false
                    },
                    { name: 'TaxRate', displayName: 'Tax Rate',cellClass:'text-right', width: "*", cellTooltip: true, filterCellFiltered: true },
                    { name: 'TaxTermName', displayName: 'Tax Term', width: "*", cellTooltip: true, filterCellFiltered: true },
                    { name: 'IsActive', displayName: 'Active', width: "*", cellTooltip: true, filterCellFiltered: true },
                  ]
                  this.gridOptions.columnDefs = columnDefs;
                  this.onLoad();
                }
                onEditFunction = ($event) => {
                  this.datashare.updateShareData($event.row);
                  AppComponent.Router.navigate(['/master/taxation']);
                }
                onLoad() {
                  this.allmasterService.gettatxation().subscribe((resData: any) => {
                    if (resData.StatusCode != 0) {
                      this.taxationData = resData.Data;
                      AppComponent.SmartAlert.Success(resData.Message);
                    }
                    else { this.taxationData = [{}]; AppComponent.SmartAlert.Errmsg(resData.Message); }
                  });
              
                }
              
              }
              