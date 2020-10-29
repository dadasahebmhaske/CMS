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
  selector: 'sa-costing-of-project',
  templateUrl: './costing-of-project.component.html',
  styleUrls: ['./costing-of-project.component.css']
})
export class CostingOfProjectComponent implements OnInit {

      public empInfo: any = {};
      public datePickerConfig: Partial<BsDatepickerConfig>;
      public DeliveredOrderData: any = [];
      public deliverFilter: any = { SiteId: '',ProjectId:'' };
      public gridOptions: IGridoption;
      public loaderbtn: boolean = true;
      public minDate: Date;
      public StartMindate: Date;
      public maxDate: Date = new Date();
      public SiteData:any=[];ProjectData:any=[];
      public project:any={};
   // public ProductArray: any = [];
      constructor(private reportService:ReportService,private appService: AppService, private masterService: MasterService,private projectService:ProjectService,private allmasterService:AllmasterService) {
        this.datePickerConfig = Object.assign({}, { containerClass: 'theme-orange', maxDate: this.maxDate, dateInputFormat: 'DD-MMM-YYYY', showWeekNumbers: false, adaptivePosition: true, isAnimated: true });
      }
    ngOnInit() {
        this.appService.getAppData().subscribe(data => { this.empInfo = data; });
       // this.deliverFilter.StartDate =this.deliverFilter.EndDate = new Date();
        this.allOnLoad();
        this.configureGrid();
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
      this.gridOptions.exporterExcelFilename = 'Project Budget Status.xlsx';
      let columnDefs = [];
      columnDefs = [
        { name: 'BudgetHeadTypeName', displayName: 'Material Type', width: "*", cellTooltip: true, filterCellFiltered: true },
        { name: 'BudgetHeadName', displayName: 'Material', width: "*", cellTooltip: true, filterCellFiltered: true }, 
         { name: 'BudgetQty', displayName: 'Budget Qty',cellClass: 'cell-right', width: "*", cellTooltip: true, filterCellFiltered: true }, 
               { name: 'UtilizedQty', displayName: 'Utilized Qty',cellClass: 'cell-right', width: "*", cellTooltip: true, filterCellFiltered: true }, 
         { name: 'RemainBudgetQty', displayName: 'Balance Qty',cellClass: 'cell-right', width: "*", cellTooltip: true, filterCellFiltered: true }, 
         { name: 'Unit', displayName: 'Unit', cellClass: 'cell-center', width: "150", cellTooltip: true, filterCellFiltered: true }, 
         { name: 'CurrentRate', displayName: 'Budget Rate',cellClass: 'cell-right',  width: "*", cellTooltip: true, filterCellFiltered: true }, 
        { name: 'PaidAmount', displayName: 'Paid Amount', cellClass: 'cell-right', width: "150", cellTooltip: true, filterCellFiltered: true }, 
       
         { name: 'ReqRemainAmount', displayName: 'Req Remain Amount ',cellClass: 'cell-right',  width: "*", cellTooltip: true, filterCellFiltered: true }, 
        
      
   
      ]
      this.gridOptions.columnDefs = columnDefs;
      this.onLoad();
    }
    onEditFunction = (event) => {

    }
    onLoad() {
      this.loaderbtn=false;
     
      this.reportService.GetProjectBudgetStatus(this.deliverFilter).subscribe((resData: any) => {
        this.loaderbtn = true;
        if (resData.StatusCode != 0) {
          this.project=resData.Data.Table[0];
          this.DeliveredOrderData = resData.Data.Table1; 
          console.log( resData.Data);
          AppComponent.SmartAlert.Success(resData.Message);
        }
        else { this.DeliveredOrderData = [{}]; AppComponent.SmartAlert.Errmsg(resData.Message); }
      });
    }
    // resetEndDate(val) {
    //   this.minDate = val;
    //   if (val != undefined && val != null && this.deliverFilter.EndDate != null) {
    //     if ((new Date(this.deliverFilter.EndDate).getTime()) < (new Date(val).getTime())) {
    //       this.deliverFilter.EndDate = '';
    //     }
    //   }
    // }
    ngOnDestroy() {
      this.appService.removeBackdrop();
      //this.stockOrdersData = [{}];
    }
  
  }