import { Component, OnInit } from '@angular/core';
import { IGridColumnDefs, IGridoption } from '../../../interface/igridoption';
import { AppComponent } from '../../../app.component';
import { DatashareService } from '../../../core/custom-services/datashare.service';
import { MasterService } from '../../../core/custom-services/master.service';
import { AppService } from '@app/core/custom-services/app.service';
import { ProjectService } from '../project.service';
import { BsDatepickerConfig } from 'ngx-bootstrap';
@Component({
  selector: 'sa-material-issue-slip-list',
  templateUrl: './material-issue-slip-list.component.html',
  styleUrls: ['./material-issue-slip-list.component.css']
})
export class MaterialIssueSlipListComponent implements OnInit {

                public empInfo: any = {};
                public datePickerConfig: Partial<BsDatepickerConfig>;
                public Filter: any = {  };
                public gridOptions: IGridoption;
                public loaderbtn: boolean = true;
                public minDate: Date;cpInfo;
                public StartMindate: Date;
                public maxDate: Date = new Date();
                public MaterialIssueData: any={};
                constructor(private appService: AppService, private datashare: DatashareService, private masters: MasterService,private projectService:ProjectService) {
                  this.datePickerConfig = Object.assign({}, { containerClass: 'theme-orange', maxDate: this.maxDate, dateInputFormat: 'DD-MMM-YYYY', showWeekNumbers: false, adaptivePosition: true, isAnimated: true });
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
                    name: 'Select', displayName: 'Details', cellTemplate: '<button  style="margin:3px;" class="btn-primary btn-xs"  ng-click="grid.appScope.editEmployee(row.entity)"  ng-if="row.entity.IsActive!=null">&nbsp;Edit&nbsp;</button> '
                    , width: "48",
                    headerCellTemplate: '<div style="text-align: center;margin-top: 30px;">Edit</div>', enableFiltering: false
                  },
                  {
                    name: 'Select1', displayName: 'Delete', cellTemplate: '<button  style="margin:3px;" class="btn-danger btn-xs"  ng-click="grid.appScope.deleteEmployee(row.entity)"  ng-if="row.entity.IsActive!=null">Delete</button> '
                    , width: "57",
                    headerCellTemplate: '<div style="text-align: center;margin-top: 30px;">Delete</div>', enableFiltering: false
                  },
                    // {
                    //   name: 'Select1', displayName: 'Details', cellTemplate: '<button  style="margin:3px;" class="btn-primary btn-xs"  ng-click="grid.appScope.editEmployee(row.entity)"  ng-if="row.entity.IsActive!=null">&nbsp;Generate PO&nbsp;</button> '
                    //   , width: "100",
                    //   headerCellTemplate: '<div style="text-align: center;margin-top: 30px;">Generate PO</div>', enableFiltering: false
                    // },
                    // {
                    //   name: 'Select2', displayName: 'Details', cellTemplate: '<button  style="margin:3px;" class="btn-success btn-xs"  ng-click="grid.appScope.editEmployee(row.entity)"  ng-if="row.entity.IsActive!=null">&nbsp;Download PO&nbsp;</button> '
                    //   , width: "105",
                    //   headerCellTemplate: '<div style="text-align: center;margin-top: 30px;">Downoad PO</div>', enableFiltering: false
                    // },
                    { name: 'DispTranNo', displayName: 'Tran No', width: "*", cellTooltip: true, filterCellFiltered: true },
                    { name: 'TranDate', displayName: 'Tran Date', width: "*", cellTooltip: true, filterCellFiltered: true },
                   
                    { name: 'SiteName', displayName: 'Site Name', width: "*", cellTooltip: true, filterCellFiltered: true }, 
                    { name: 'ProjectName', displayName: 'Project Name', width: "*", cellTooltip: true, filterCellFiltered: true },
                 
                    { name: 'IssueProjectName', displayName: 'Issue Project Name', width: "*", cellTooltip: true, filterCellFiltered: true },
                    { name: 'IssueSiteName', displayName: 'Issue Site Name', width: "*", cellTooltip: true, filterCellFiltered: true },
                    { name: 'VendorName', displayName: 'Vendor Name', width: "*", cellTooltip: true, filterCellFiltered: true },
                  ]
                  this.gridOptions.columnDefs = columnDefs;
                  this.onLoad();
  
                }
                onEditFunction = ($event) => {
                  this.datashare.updateShareData($event.row);
                  AppComponent.Router.navigate(['/project/material-issue-slip']);
                }

                onDeleteFunction = ($event) => {
                  this.datashare.updateShareData($event.row);
                  this.projectService.getDeleteTransaction($event.row.TranNo, 107).subscribe((resData: any) => {
                    if (resData.StatusCode != 0) {
                      this.onLoad();
                      AppComponent.SmartAlert.Success(resData.Message);
                        }
                    else {  AppComponent.SmartAlert.Errmsg(resData.Message); }
                  });
                }

                onLoad() {
                  this.loaderbtn=false;
                  this.Filter.StartDate= this.appService.DateToString(this.Filter.StartDate);
                  this.Filter.EndDate= this.appService.DateToString(this.Filter.EndDate)
                  this.projectService.getTransactionlist(107,this.Filter).subscribe((resData: any) => {
                    this.loaderbtn=true;
                    if (resData.StatusCode != 0) {
                      this.MaterialIssueData = resData.Data.Table; console.log( resData.Data);
                      AppComponent.SmartAlert.Success(resData.Message);
                    }
                    else { this.MaterialIssueData = [{}]; AppComponent.SmartAlert.Errmsg(resData.Message); }
                  });
                }

                resetEndDate(val) {
                  this.minDate = val;
                  if (val != undefined && val != null && this.Filter.EndDate != null) {
                    if ((new Date(this.Filter.EndDate).getTime()) < (new Date(val).getTime())) {
                      this.Filter.EndDate = '';
                    }
                  }
                }
              
              }
              
      