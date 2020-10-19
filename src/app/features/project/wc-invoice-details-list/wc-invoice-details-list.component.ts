import { Component, OnInit } from '@angular/core';
import { IGridColumnDefs, IGridoption } from '../../../interface/igridoption';
import { AppComponent } from '../../../app.component';
import { DatashareService } from '../../../core/custom-services/datashare.service';
import { MasterService } from '../../../core/custom-services/master.service';
import { AppService } from '@app/core/custom-services/app.service';
import { ProjectService } from '../project.service';
import { BsDatepickerConfig } from 'ngx-bootstrap';
@Component({
  selector: 'sa-wc-invoice-details-list',
  templateUrl: './wc-invoice-details-list.component.html',
  styleUrls: ['./wc-invoice-details-list.component.css']
})
export class WcInvoiceDetailsListComponent implements OnInit {
                  public empInfo: any = {};
                  public datePickerConfig: Partial<BsDatepickerConfig>;
                  public Filter: any = {  };
                  public gridOptions: IGridoption;
                  public loaderbtn: boolean = true;
                  public minDate: Date;
                  public StartMindate: Date;
                  public maxDate: Date = new Date();
                  public WcInvoiceData: any;cpInfo;
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
                      { name: 'VehicleTypeId', displayName: 'Vehicle Type Id', width: "*", cellTooltip: true, filterCellFiltered: true },
                      { name: 'VehicleType', displayName: 'Transport', width: "*", cellTooltip: true, filterCellFiltered: true },
                      { name: 'IsActive', displayName: 'Active', width: "*", cellTooltip: true, filterCellFiltered: true },
                    ]
                    this.gridOptions.columnDefs = columnDefs;
                    this.onLoad();
                  }
                  onEditFunction = ($event) => {
                    this.datashare.updateShareData($event.row);
                    AppComponent.Router.navigate(['/master/site']);
                  }
                  onDeleteFunction = ($event) => {
                    this.datashare.updateShareData($event.row);
                    this.projectService.getDeleteTransaction($event.row.TranNo, 102).subscribe((resData: any) => {
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
                    this.projectService.getTransactionlist(102,this.Filter).subscribe((resData: any) => {
                      this.loaderbtn=true;
                      if (resData.StatusCode != 0) {
                        this.WcInvoiceData = resData.Data.Table; console.log( resData.Data);
                        AppComponent.SmartAlert.Success(resData.Message);
                      }
                      else { this.WcInvoiceData = [{}]; AppComponent.SmartAlert.Errmsg(resData.Message); }
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
                