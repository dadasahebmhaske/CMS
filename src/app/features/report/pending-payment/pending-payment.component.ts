import { Component, OnInit, OnDestroy } from '@angular/core';
import { IGridColumnDefs, IGridoption } from '../../../interface/igridoption';
import { AppComponent } from '../../../app.component';
import { AppService } from '@app/core/custom-services/app.service';
import { DatashareService } from '@app/core/custom-services/datashare.service';
import { MasterService } from '@app/core/custom-services/master.service';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { AllmasterService } from '@app/features/master/allmaster.service';
import { ProjectService } from '../../../features/project/project.service';
import { ReportService } from '../../report/report.service';
@Component({
  selector: 'sa-pending-payment',
  templateUrl: './pending-payment.component.html',
  styleUrls: ['./pending-payment.component.css']
})
export class PendingPaymentComponent implements OnInit {

  public empInfo: any = {};
  public datePickerConfig: Partial<BsDatepickerConfig>;
  public DeliveredOrderData: any = [];

  public deliverFilter: any = { SiteId: '', ProjectId: '', Type: '', PartyId: '' };
  public gridOptions: IGridoption;
  public loaderbtn: boolean = true;
  public minDate: Date;
  public StartMindate: Date;
  public maxDate: Date = new Date();
  public SiteData: any = []; ProjectData: any = []; VendorData: any = [];VendoArray:any=[];
  // public ProductArray: any = [];
  constructor(private reportService: ReportService, private appService: AppService, private masterService: MasterService, private projectService: ProjectService, private allmasterService: AllmasterService) {
    this.datePickerConfig = Object.assign({}, { containerClass: 'theme-orange', maxDate: this.maxDate, dateInputFormat: 'DD-MMM-YYYY', showWeekNumbers: false, adaptivePosition: true, isAnimated: true });
  }
  ngOnInit() {
    this.appService.getAppData().subscribe(data => { this.empInfo = data; });
    this.deliverFilter.StartDate = this.deliverFilter.EndDate = new Date();
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
    this.projectService.getVendorContractor(102).subscribe((resVData: any) => {
      if (resVData.StatusCode != 0) {
        this.VendorData = resVData.Data;

      }
      else { this.VendorData = []; AppComponent.SmartAlert.Errmsg(resVData.Message); }
    });
  }
  onSelectType(){
    let obj;
    let CompId=this.deliverFilter.Type==10501?102:101;
    obj = this.projectService.filterData(this.VendorData, CompId, 'CompanyTypeId');
    this.VendoArray = obj;
    this.VendoArray.unshift({
      PartyId : '',      CompanyId: '',     CompanyName: 'ALL'
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
    this.gridOptions.exporterExcelFilename = 'Invoice & Payment Status.xlsx';
    let columnDefs = [];
    columnDefs = [
      // {
      //   name: 'Select', displayName: 'Details', cellTemplate: '<button  style="margin:3px;" class="btn-warning btn-xs" ng-if="row.entity.ConsNo !=null" ng-click="grid.appScope.editEmployee(row.entity)"  data-toggle="modal" data-target="#productsModal">&nbsp;Product&nbsp;</button> '
      //   , width: "71", exporterSuppressExport: true,
      //   headerCellTemplate: '<div style="text-align: center;margin-top: 30px;">Details</div>', enableFiltering: false
      // },
      { name: 'SiteName', displayName: 'Site Name', width: "220", cellTooltip: true, filterCellFiltered: true },
      { name: 'ProjectName', displayName: 'Project Name', width: "220", cellTooltip: true, filterCellFiltered: true },
      { name: 'DispINVTranNo', displayName: 'Tran No.', width: "150", cellClass: 'cell-center', cellTooltip: true, filterCellFiltered: true },
      { name: 'INVTranDate', displayName: 'Tran Date', width: "150", cellClass: 'cell-center', cellTooltip: true, filterCellFiltered: true },
      { name: 'VendorInvoiceNo', displayName: 'Invoice No.', width: "150", cellClass: 'cell-center', cellTooltip: true, filterCellFiltered: true },
      { name: 'VendorInvoiceDate', displayName: 'Invoice Date', width: "150", cellClass: 'cell-center', cellTooltip: true, filterCellFiltered: true },
      { name: 'VendorName', displayName: 'Party Name',  width: "150", cellTooltip: true, filterCellFiltered: true },
      { name: 'InvoiceRemark', displayName: 'Invoice Remark', width: "180", cellTooltip: true, filterCellFiltered: true },
      { name: 'INVCreatedByName', displayName: 'Invoice Created By', width: "200", cellTooltip: true, filterCellFiltered: true },

      { name: 'PayModeName', displayName: 'Payment Mode', width: "180", cellTooltip: true, filterCellFiltered: true },
      { name: 'ChequeNo', displayName: 'Cheque No.', width: "180", cellTooltip: true, filterCellFiltered: true },
      { name: 'RTGSNo', displayName: 'RTGS No.', width: "180", cellTooltip: true, filterCellFiltered: true },
      { name: 'TotAmount', displayName: 'Payment Amount', width: "150", cellClass: 'cell-right', cellTooltip: true, filterCellFiltered: true },
      { name: 'PayTranNo', displayName: 'Pay Trans No.', width: "150", cellClass: 'cell-center', cellTooltip: true, filterCellFiltered: true },
      { name: 'PayTranDate', displayName: 'Pay Trans Date', width: "150", cellClass: 'cell-center', cellTooltip: true, filterCellFiltered: true },
      { name: 'PaymentDate', displayName: 'Payment Date', width: "150", cellClass: 'cell-center', cellTooltip: true, filterCellFiltered: true },
      { name: 'PayRemark', displayName: 'Payment Remark', width: "180", cellTooltip: true, filterCellFiltered: true },
      { name: 'PayCreatedByName', displayName: 'Payment Created By', width: "200", cellTooltip: true, filterCellFiltered: true },


    ]
    this.gridOptions.columnDefs = columnDefs;
    this.onLoad();
  }
  onEditFunction = (event) => {

  }
  onLoad() {
    this.loaderbtn = false;
    this.deliverFilter.StartDate = this.appService.DateToString(this.deliverFilter.StartDate);
    this.deliverFilter.EndDate = this.appService.DateToString(this.deliverFilter.EndDate)
    this.reportService.GetInvoiceAndPaymentStatus(this.deliverFilter).subscribe((resData: any) => {
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