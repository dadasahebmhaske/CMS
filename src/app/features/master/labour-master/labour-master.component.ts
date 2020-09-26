import { Component, OnInit } from '@angular/core';
import { IGridColumnDefs, IGridoption } from '../../../interface/igridoption';
import { AppComponent } from '../../../app.component';
import { DatashareService } from '../../../core/custom-services/datashare.service';
import { MasterService } from '../../../core/custom-services/master.service';
import { AppService } from '@app/core/custom-services/app.service';
import { AllmasterService } from '../allmaster.service';
@Component({
  selector: 'sa-labour-master',
  templateUrl: './labour-master.component.html',
  styleUrls: ['./labour-master.component.css']
})
export class LabourMasterComponent implements OnInit {
                public empInfo: any = {};
                public gridOptions: IGridoption;
                public labourData: any;
                constructor(private appService: AppService, private datashare: DatashareService, private masters: MasterService,private allmasterService:AllmasterService) {
                }
                ngOnInit() {
                  this.appService.getAppData().subscribe(data => { this.empInfo = data });
                  this.configureGrid();
                }
                configureGrid() {
                  this.gridOptions = <IGridoption>{}
                  this.gridOptions.exporterMenuPdf = false;
                  this.gridOptions.exporterExcelFilename = 'Labour Master list.xlsx';
                  this.gridOptions.selectionRowHeaderWidth = 0;
                  let columnDefs = [];
                  columnDefs = [
                    {
                      name: 'Select', displayName: 'Details', cellTemplate: '<button  style="margin:3px;" class="btn-primary btn-xs"  ng-click="grid.appScope.editEmployee(row.entity)"  ng-if="row.entity.IsActive!=null">&nbsp;Edit&nbsp;</button> '
                      , width: "48",
                      headerCellTemplate: '<div style="text-align: center;margin-top: 30px;">Edit</div>', enableFiltering: false
                    },
                    { name: 'LabourName', displayName: 'Labour Name', width: "200", cellTooltip: true, filterCellFiltered: true },
                    { name: 'DesigName', displayName: 'Designation', width: "150", cellTooltip: true, filterCellFiltered: true },
                    { name: 'MobileNo', displayName: 'Mobile No.',cellClass:'text-center', width: "105", cellTooltip: true, filterCellFiltered: true },
                    { name: 'Address', displayName: 'Address', width: "250", cellTooltip: true, filterCellFiltered: true },
                    { name: 'PerDayRate', displayName: 'Per Day Rate',cellClass:'text-right', width: "110", cellTooltip: true, filterCellFiltered: true },
                    { name: 'AadhaarNo', displayName: 'Aadhaar No.',cellClass:'text-center', width: "110", cellTooltip: true, filterCellFiltered: true },
                    { name: 'BankName', displayName: 'Bank Name', width: "180", cellTooltip: true, filterCellFiltered: true },
                    { name: 'AccountNo', displayName: 'Account No.',cellClass:'text-center', width: "150", cellTooltip: true, filterCellFiltered: true },
                     { name: 'IFSCNo', displayName: 'IFSC',cellClass:'text-center', width: "120", cellTooltip: true, filterCellFiltered: true },
                    { name: 'IsActive', displayName: 'Active', width: "80", cellTooltip: true, filterCellFiltered: true },
                  ]
                  this.gridOptions.columnDefs = columnDefs;
                  this.onLoad();
                }
                onEditFunction = ($event) => {
                  this.datashare.updateShareData($event.row);
                  AppComponent.Router.navigate(['/master/labour-master']);
                }
                onLoad() {
                  this.allmasterService.getLabour().subscribe((resData: any) => {
                    if (resData.StatusCode != 0) {
                      this.labourData = resData.Data;
                      AppComponent.SmartAlert.Success(resData.Message);
                    }
                    else { this.labourData = [{}]; AppComponent.SmartAlert.Errmsg(resData.Message); }
                  });
              
                }
              
              }
              