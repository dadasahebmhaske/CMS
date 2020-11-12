import { Component, OnInit } from '@angular/core';
import { IGridColumnDefs, IGridoption } from '../../../interface/igridoption';
import { AppComponent } from '../../../app.component';
import { DatashareService } from '../../../core/custom-services/datashare.service';
import { MasterService } from '../../../core/custom-services/master.service';
import { AppService } from '@app/core/custom-services/app.service';
import { ProjectService } from '../project.service';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import Swal from 'sweetalert2';
@Component({
  selector: 'sa-labour-contract-list',
  templateUrl: './labour-contract-list.component.html',
  styleUrls: ['./labour-contract-list.component.css']
})
export class LabourContractListComponent implements OnInit {

                  public empInfo: any = {};
                  public datePickerConfig: Partial<BsDatepickerConfig>;
                  public Filter: any = {  };
                  public gridOptions: IGridoption;
                  public loaderbtn: boolean = true;
                  public minDate: Date;cpInfo;
                  public StartMindate: Date;
                  public maxDate: Date = new Date();
                  public LabourContractData: any={};
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
                      , width: "50",
                      headerCellTemplate: '<div style="text-align: center;margin-top: 30px;">Edit</div>', enableFiltering: false
                    },
                    {
                      name: 'Select1', displayName: 'Details', cellTemplate: `<button  style="margin:3px;" class="btn-warning btn-xs"  ng-click="grid.appScope.closeEmployee(row.entity)"  ng-if="row.entity.IsClosed!='Y'&& row.entity.IsActive!=null"">&nbsp;Close&nbsp;</button><button  style="margin:3px;" class="btn-default btn-xs"  ng-if="row.entity.IsClosed=='Y'">&nbsp;Closed&nbsp;</button> `
                      , width: "55",
                      headerCellTemplate: '<div style="text-align: center;margin-top: 30px;">Close</div>', enableFiltering: false
                    },
                    {
                      name: 'Select11', displayName: 'Delete', cellTemplate: '<button  style="margin:3px;" class="btn-danger btn-xs"  ng-click="grid.appScope.deleteEmployee(row.entity)"  ng-if="row.entity.IsActive!=null">Delete</button> '
                      , width: "57",
                      headerCellTemplate: '<div style="text-align: center;margin-top: 30px;">Delete</div>', enableFiltering: false
                    },
                    {
                      name: 'Select2', displayName: 'Details', cellTemplate: `<button  style="margin:3px;" class="btn-success btn-xs"  ng-click="grid.appScope.approveEmployee(row.entity)"  ng-if="row.entity.IsApproved!='Y'&& row.entity.IsActive!=null"">&nbsp;Approve&nbsp;</button><button  style="margin:3px;" class="btn-default btn-xs"  ng-if="row.entity.IsApproved=='Y'">&nbsp;Approved&nbsp;</button>`
                      , width: "74",
                      headerCellTemplate: '<div style="text-align: center;margin-top: 30px;">Approve</div>', enableFiltering: false
                    },
                   
                    { name: 'DispTranNo', displayName: 'Trans No.', width: "*", cellTooltip: true, cellClass: 'text-center', filterCellFiltered: true },
                    { name: 'TranDate', displayName: 'Trans Date', width: "*", cellTooltip: true, cellClass: 'text-center', filterCellFiltered: true },
              
                    { name: 'SiteName', displayName: 'Site Name', width: "*", cellTooltip: true, filterCellFiltered: true },
                    { name: 'ProjectName', displayName: 'Project Name', width: "*", cellTooltip: true, filterCellFiltered: true },
              
                    { name: 'TotAmount', displayName: 'Total Amount', width: "*", cellClass: 'text-right', cellTooltip: true, filterCellFiltered: true },
                   // { name: 'VendorName', displayName: 'Vendor Name', width: "*", cellTooltip: true, filterCellFiltered: true },
                  ]
                  this.gridOptions.columnDefs = columnDefs;
                  this.onLoad();
                }
                onEditFunction = ($event) => {
                  this.datashare.updateShareData($event.row);
                  AppComponent.Router.navigate(['/project/labour-contract']);
                }

                onDeleteFunction = ($event) => {
                  this.LabourContractAction('Delete', $event.row.TranNo);
                }

                onApproveFunction = ($event) => {
                  this.LabourContractAction('Approve', $event.row.TranNo);
                }

                onCloseFunction = ($event) => {
                  this.LabourContractAction('Close', $event.row.TranNo);
                }

                LabourContractAction(action, TranNo) {
                  let text = `Do you want to ${action} this Work Contract!`
                  Swal.fire({
                    title: 'Are you sure?',
                    text: `${text}`,
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: `Yes, ${action} it!`,
                    cancelButtonText: 'No, keep it'
                  }).then((result) => {
                    if (result.value) {
                      switch (action) {
                        case 'Delete':
                          this.projectService.getDeleteTransaction(TranNo, 109).subscribe((resData: any) => {
                            if (resData.StatusCode != 0) {
                              this.onLoad();
                              AppComponent.SmartAlert.Success(resData.Message);
                            }
                            else { AppComponent.SmartAlert.Errmsg(resData.Message); }
                          });
                          break;
                        case 'Close':
                          this.projectService.getClose(TranNo, 109, this.cpInfo.EmpId).subscribe((resData: any) => {
                            if (resData.StatusCode != 0) {
                              this.onLoad();
                              AppComponent.SmartAlert.Success(resData.Message);
                            }
                            else { AppComponent.SmartAlert.Errmsg(resData.Message); }
                          });
                          break;
                        case 'Approve':
                          this.projectService.getApprove(TranNo, 109, this.cpInfo.EmpId).subscribe((resData: any) => {
                            if (resData.StatusCode != 0) {
                              this.onLoad();
                              AppComponent.SmartAlert.Success(resData.Message);
                            }
                            else { AppComponent.SmartAlert.Errmsg(resData.Message); }
                          });
                          break;
                      }
                    } else if (result.dismiss === Swal.DismissReason.cancel) { }
                  })
                }

                onLoad() {
                  this.loaderbtn=false;
                  this.Filter.StartDate= this.appService.DateToString(this.Filter.StartDate);
                  this.Filter.EndDate= this.appService.DateToString(this.Filter.EndDate)
                  this.projectService.getTransactionlist(109,this.Filter).subscribe((resData: any) => {
                    this.loaderbtn=true;
                    if (resData.StatusCode != 0) {
                      this.LabourContractData = resData.Data.Table; 
                      console.log( this.LabourContractData);
                      AppComponent.SmartAlert.Success(resData.Message);
                    }
                    else { this.LabourContractData = [{}]; AppComponent.SmartAlert.Errmsg(resData.Message); }
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
              
      