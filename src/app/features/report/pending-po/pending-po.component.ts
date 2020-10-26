import { Component, OnInit, OnDestroy } from '@angular/core';
import { IGridColumnDefs, IGridoption } from '../../../interface/igridoption';
import { AppComponent } from '../../../app.component';
import { AppService } from '@app/core/custom-services/app.service';
import { DatashareService } from '@app/core/custom-services/datashare.service';
import { MasterService } from '@app/core/custom-services/master.service';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { AllmasterService } from '@app/features/master/allmaster.service';
import { ProjectService } from '../../../features/project/project.service';
@Component({
  selector: 'sa-pending-po',
  templateUrl: './pending-po.component.html',
  styleUrls: ['./pending-po.component.css']
})
export class PendingPoComponent implements OnInit {

  public cpInfo: any = {};
  public datePickerConfig: Partial<BsDatepickerConfig>;
  public DeliveredOrderData: any = [];

  public deliverFilter: any = { DelUserCode: '',CustTypeId:'' };
  public gridOptions: IGridoption;
  public loaderbtn: boolean = true;
  public minDate: Date;
  public StartMindate: Date;
  public maxDate: Date = new Date();
  public SiteData:any=[];ProjectData:any=[];
         // public ProductArray: any = [];
         constructor(private appService: AppService, private masterService: MasterService,private projectService:ProjectService,private allmasterService:AllmasterService) {
          this.datePickerConfig = Object.assign({}, { containerClass: 'theme-orange', maxDate: this.maxDate, dateInputFormat: 'DD-MMM-YYYY', showWeekNumbers: false, adaptivePosition: true, isAnimated: true });
        }
        ngOnInit() {
          this.appService.getAppData().subscribe(data => { this.cpInfo = data;this.deliverFilter.CPCode= this.cpInfo.CPCode; });
         this.deliverFilter.StartDate =this.deliverFilter.EndDate = new Date();
          this.allOnLoad();
          this.configureGrid(); //this.DeliveredOrderData = [{}];
        }
        allOnLoad() {
          this.allmasterService.getSite('Y').subscribe((resSData: any) => {
            if (resSData.StatusCode != 0) {
              this.SiteData = resSData.Data;
            }
            else { this.SiteData = []; AppComponent.SmartAlert.Errmsg(resSData.Message); }
          });
        }
  
        public onSelectSite(id) {
          this.projectService.getProject(id).subscribe((resSData: any) => {
            if (resSData.StatusCode != 0) {
                this.ProjectData = resSData.Data;
              }
            else { this.ProjectData = []; AppComponent.SmartAlert.Errmsg(resSData.Message); }
          });
        }
          configureGrid() {
            this.gridOptions = <IGridoption>{}
            this.gridOptions.exporterMenuPdf = false;
            this.gridOptions.selectionRowHeaderWidth = 0;
            this.gridOptions.exporterExcelFilename = 'Customer Wise Transaction Details.xlsx';
            let columnDefs = [];
            columnDefs = [
              // {
              //   name: 'Select', displayName: 'Details', cellTemplate: '<button  style="margin:3px;" class="btn-warning btn-xs" ng-if="row.entity.ConsNo !=null" ng-click="grid.appScope.editEmployee(row.entity)"  data-toggle="modal" data-target="#productsModal">&nbsp;Product&nbsp;</button> '
              //   , width: "71", exporterSuppressExport: true,
              //   headerCellTemplate: '<div style="text-align: center;margin-top: 30px;">Details</div>', enableFiltering: false
              // },
              { name: 'CustType', displayName: 'Customer Type', width: "220", cellTooltip: true, filterCellFiltered: true },
              { name: 'CustName', displayName: 'Customer Name', width: "220", cellTooltip: true, filterCellFiltered: true }, 
              { name: 'AreaName', displayName: 'Area', width: "220", cellTooltip: true, filterCellFiltered: true }, 
              { name: 'SubAreaName', displayName: 'Sub Area', width: "220", cellTooltip: true, filterCellFiltered: true }, 
              { name: 'PinCode', displayName: 'Pincode', cellClass: 'cell-center', width: "130", cellTooltip: true, filterCellFiltered: true }, 
      
            { name: 'ProdSeg', displayName: 'Product Segment', width: "220", cellTooltip: true, filterCellFiltered: true }, 
              { name: 'Product', displayName: 'Product', width: "200", cellTooltip: true, filterCellFiltered: true },
              { name: 'ProdQty', displayName: 'Qty of Product', cellClass: 'cell-right', width: "150", cellTooltip: true, filterCellFiltered: true },
              { name: 'ProdValue', displayName: 'Value of Product', cellClass: 'cell-right', width: "150", cellTooltip: true, filterCellFiltered: true },
              { name: 'ProdValuePaid', displayName: 'Value of Product Paid', cellClass: 'cell-right', width: "180", cellTooltip: true, filterCellFiltered: true },
              { name: 'ProdValueOs', displayName: 'Value of Product O/S', cellClass: 'cell-right', width: "180", cellTooltip: true, filterCellFiltered: true },
              //{ name: 'ProdValueUC', displayName: 'Value of Payments Under Clearing', cellClass: 'cell-right', width: "260", cellTooltip: true, filterCellFiltered: true },
            ]
            this.gridOptions.columnDefs = columnDefs;
            this.onLoad();
          }
          onEditFunction = (event) => {
      
          }
          onLoad() {
            this.loaderbtn=false;
            this.deliverFilter.StartDate = this.appService.DateToString(this.deliverFilter.StartDate);
            this.deliverFilter.EndDate = this.appService.DateToString(this.deliverFilter.EndDate)
            this.projectService.getTransactionlist(104, this.deliverFilter).subscribe((resData: any) => {
              this.loaderbtn = true;
              if (resData.StatusCode != 0) {
                this.DeliveredOrderData = resData.Data.Table; console.log(resData.Data);
                AppComponent.SmartAlert.Success(resData.Message);
              }
              else { this.DeliveredOrderData = [{}]; AppComponent.SmartAlert.Errmsg(resData.Message); }
            });
          }
          resetEndDate(val) {
            this.minDate = val;
            if (val != undefined && val != null && this.deliverFilter.EndDate != null) {
              if ((new Date(this.deliverFilter.EndDate).getTime()) < (new Date(val).getTime())) {
                this.deliverFilter.EndDate = '';
              }
            }
          }
          ngOnDestroy() {
            this.appService.removeBackdrop();
            //this.stockOrdersData = [{}];
          }
        
        }