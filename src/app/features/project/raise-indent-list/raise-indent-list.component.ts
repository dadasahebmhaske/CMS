import { Component, OnInit } from '@angular/core';
import { IGridColumnDefs, IGridoption } from '../../../interface/igridoption';
import { AppComponent } from '../../../app.component';
import { DatashareService } from '../../../core/custom-services/datashare.service';
import { MasterService } from '../../../core/custom-services/master.service';
import { AppService } from '@app/core/custom-services/app.service';
import { ProjectService } from '../project.service';
import { BsDatepickerConfig } from 'ngx-bootstrap';
@Component({
  selector: 'sa-raise-indent-list',
  templateUrl: './raise-indent-list.component.html',
  styleUrls: ['./raise-indent-list.component.css']
})
export class RaiseIndentListComponent implements OnInit {
  public empInfo: any = {};
  public datePickerConfig: Partial<BsDatepickerConfig>;
  public Filter: any = {  };
  public gridOptions: IGridoption;
  public loaderbtn: boolean = true;
  public minDate: Date;
  public StartMindate: Date;
  public maxDate: Date = new Date();
  public RaiseIndentData: any;
  constructor(private appService: AppService, private datashare: DatashareService, private masters: MasterService,private projectService:ProjectService) {
    this.datePickerConfig = Object.assign({}, { containerClass: 'theme-orange', maxDate: this.maxDate, dateInputFormat: 'DD-MMM-YYYY', showWeekNumbers: false, adaptivePosition: true, isAnimated: true });
   }
  ngOnInit() {
    this.appService.getAppData().subscribe(data => { this.empInfo = data });
  //  this.Filter.StartDate =this.Filter.EndDate = new Date();
    this.configureGrid();
  }
  configureGrid() {
    this.gridOptions = <IGridoption>{}
    this.gridOptions.exporterMenuPdf = false;
    this.gridOptions.exporterExcelFilename = 'Raise Indent list.xlsx';
    this.gridOptions.selectionRowHeaderWidth = 0;
    let columnDefs = [];
    columnDefs = [
      {
        name: 'Select', displayName: 'Details', cellTemplate: '<button  style="margin:3px;" class="btn-primary btn-xs"  ng-click="grid.appScope.editEmployee(row.entity)"  ng-if="row.entity.IsActive!=null">&nbsp;Edit&nbsp;</button> '
        , width: "48",
        headerCellTemplate: '<div style="text-align: center;margin-top: 30px;">Edit</div>', enableFiltering: false
      },
      { name: 'SiteName', displayName: 'Site Name', width: "*", cellTooltip: true, filterCellFiltered: true },
      { name: 'ProjectName', displayName: 'Project Name', width: "*", cellTooltip: true, filterCellFiltered: true },
     // { name: 'ManagerName', displayName: 'Manager Name', width: "*", cellTooltip: true, filterCellFiltered: true },
     // { name: 'ExecutiveName', displayName: 'Executive Name', width: "*", cellTooltip: true, filterCellFiltered: true },
      { name: 'ExpectedDate', displayName: 'Expected Date',cellClass:'text-center', width: "*", cellTooltip: true, filterCellFiltered: true },
      { name: 'DispTranNo', displayName: 'Trans No.',cellClass:'text-center', width: "*", cellTooltip: true, filterCellFiltered: true },
      { name: 'TranDate', displayName: 'Trans Date',cellClass:'text-center', width: "*", cellTooltip: true, filterCellFiltered: true },
      //{ name: 'IsActive', displayName: 'Active', width: "*", cellTooltip: true, filterCellFiltered: true },
    ]
    this.gridOptions.columnDefs = columnDefs;
    this.onLoad();
  }
  onEditFunction = ($event) => {
    this.datashare.updateShareData($event.row);
    AppComponent.Router.navigate(['/project/raise-indent']);
  }
  onLoad() {
    this.loaderbtn=false;
    this.Filter.StartDate= this.appService.DateToString(this.Filter.StartDate);
    this.Filter.EndDate= this.appService.DateToString(this.Filter.EndDate)
    this.projectService.getTransactionlist(102,this.Filter).subscribe((resData: any) => {
      this.loaderbtn=true;
      if (resData.StatusCode != 0) {
        this.RaiseIndentData = resData.Data.Table; console.log( resData.Data);
        AppComponent.SmartAlert.Success(resData.Message);
      }
      else { this.RaiseIndentData = [{}]; AppComponent.SmartAlert.Errmsg(resData.Message); }
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

