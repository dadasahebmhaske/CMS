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
  selector: 'sa-project-budget-list',
  templateUrl: './project-budget-list.component.html',
  styleUrls: ['./project-budget-list.component.css']
})
export class ProjectBudgetListComponent implements OnInit {
  public cpInfo: any = {};
  public datePickerConfig: Partial<BsDatepickerConfig>;
  public Filter: any = {};
  public gridOptions: IGridoption;
  public loaderbtn: boolean = true;
  public minDate: Date;
  public StartMindate: Date;
  public maxDate: Date = new Date();
  public projectBudgetData: any;
  constructor(private appService: AppService, private datashare: DatashareService, private masters: MasterService, private projectService: ProjectService) {
    this.datePickerConfig = Object.assign({}, { containerClass: 'theme-orange', maxDate: this.maxDate, dateInputFormat: 'DD-MMM-YYYY', showWeekNumbers: false, adaptivePosition: true, isAnimated: true });
  }
  ngOnInit() {
    //this.appService.getAppData().subscribe(data => { this.empInfo = data });
    this.appService.getAppData().subscribe(data => { this.cpInfo = data });
    // this.Filter.StartDate =this.Filter.EndDate = new Date();
    this.configureGrid();
  }
  configureGrid() {
    this.gridOptions = <IGridoption>{}
    this.gridOptions.exporterMenuPdf = false;
    this.gridOptions.exporterExcelFilename = 'Project Budget list.xlsx';
    this.gridOptions.selectionRowHeaderWidth = 0;
    let columnDefs = [];
    columnDefs = [
      {
        name: 'Select', displayName: 'Details', cellTemplate: '<button  style="margin:3px;" class="btn-primary btn-xs"  ng-click="grid.appScope.editEmployee(row.entity)"  ng-if="row.entity.IsActive!=null">&nbsp;Edit&nbsp;</button> '
        , width: "48",
        headerCellTemplate: '<div style="text-align: center;margin-top: 30px;">Edit</div>', enableFiltering: false
      },
      {
        name: 'Select2', displayName: 'Details', cellTemplate: `<button  style="margin:3px;" class="btn-success btn-xs"  ng-click="grid.appScope.approveEmployee(row.entity)"  ng-if="row.entity.IsApproved!='Y'&&row.entity.IsActive!=null">&nbsp;Approve&nbsp;</button><button  style="margin:3px;" class="btn-default btn-xs"  ng-if="row.entity.IsApproved=='Y'">&nbsp;Approved&nbsp;</button>`
        , width: "74",
        headerCellTemplate: '<div style="text-align: center;margin-top: 30px;">Approve</div>', enableFiltering: false
      },
      {
        name: 'Select1', displayName: 'Delete', cellTemplate: '<button  style="margin:3px;" class="btn-danger btn-xs"  ng-click="grid.appScope.deleteEmployee(row.entity)"  ng-if="row.entity.IsActive!=null">Delete</button> '
        , width: "57",
        headerCellTemplate: '<div style="text-align: center;margin-top: 30px;">Delete</div>', enableFiltering: false
      },
      { name: 'DispTranNo', displayName: 'Trans No.', cellClass: 'text-center', width: "*", cellTooltip: true, filterCellFiltered: true },
      { name: 'TranDate', displayName: 'Tran Date', cellClass: 'text-center', width: "*", cellTooltip: true, filterCellFiltered: true },
      { name: 'SiteName', displayName: 'Site Name', width: "*", cellTooltip: true, filterCellFiltered: true },
      { name: 'ProjectName', displayName: 'Project Name', width: "*", cellTooltip: true, filterCellFiltered: true },
      { name: 'ManagerName', displayName: 'Manager Name', width: "*", cellTooltip: true, filterCellFiltered: true },
      { name: 'ExecutiveName', displayName: 'Executive Name', width: "*", cellTooltip: true, filterCellFiltered: true },
      { name: 'TotProjectCost', displayName: 'Project Cost', cellClass: 'text-right', width: "*", cellTooltip: true, filterCellFiltered: true },
     //{ name: 'IsActive', displayName: 'Active', width: "*", cellTooltip: true, filterCellFiltered: true },
    ]
    this.gridOptions.columnDefs = columnDefs;
    this.onLoad();
  }
  onEditFunction = ($event) => {
    this.datashare.updateShareData($event.row);
    AppComponent.Router.navigate(['/project/project-budget']);
  }
  onDeleteFunction = ($event) => {
    let text = `Do you want to delete this transaction!`
    let subText = 'Delete';
    Swal.fire({
      title: 'Are you sure?',
      text: `${text}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: `Yes, ${subText} it!`,
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.projectService.getDeleteTransaction($event.row.TranNo, 101).subscribe((resData: any) => {
          if (resData.StatusCode != 0) {
            this.onLoad();
            AppComponent.SmartAlert.Success(resData.Message);
              }
          else { AppComponent.SmartAlert.Errmsg(resData.Message); }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) { }
    })
  }
  onLoad() {
    this.loaderbtn = false;
    this.Filter.StartDate = this.appService.DateToString(this.Filter.StartDate);
    this.Filter.EndDate = this.appService.DateToString(this.Filter.EndDate)
    this.projectService.getTransactionlist(101, this.Filter).subscribe((resData: any) => {
      this.loaderbtn = true;
      if (resData.StatusCode != 0) {
        this.projectBudgetData = resData.Data.Table; 
        AppComponent.SmartAlert.Success(resData.Message);
      }
      else { this.projectBudgetData = [{}]; AppComponent.SmartAlert.Errmsg(resData.Message); }
    });

  }
 
  onApproveFunction = ($event) => {
    this.ProjectAction('Approve', $event.row.TranNo);
  }

  ProjectAction(action, TranNo) {
    let text = `Do You want to ${action} this order!`
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
          // case 'Delete':
          //   this.projectService.getDeleteTransaction(TranNo, 103).subscribe((resData: any) => {
          //     if (resData.StatusCode != 0) {
          //       this.onLoad();
          //       AppComponent.SmartAlert.Success(resData.Message);
          //     }
          //     else { AppComponent.SmartAlert.Errmsg(resData.Message); }
          //   });
          //   break;
          // case 'Close':
          //   this.projectService.getClose(TranNo, 103, this.cpInfo.EmpId).subscribe((resData: any) => {
          //     if (resData.StatusCode != 0) {
          //       this.onLoad();
          //       AppComponent.SmartAlert.Success(resData.Message);
          //     }
          //     else { AppComponent.SmartAlert.Errmsg(resData.Message); }
          //   });
          //   break;
          case 'Approve':
            this.projectService.getApprove(TranNo, 101, this.cpInfo.EmpId).subscribe((resData: any) => {
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


  resetEndDate(val) {
    this.minDate = val;
    if (val != undefined && val != null && this.Filter.EndDate != null) {
      if ((new Date(this.Filter.EndDate).getTime()) < (new Date(val).getTime())) {
        this.Filter.EndDate = '';
      }
    }
  }

}

