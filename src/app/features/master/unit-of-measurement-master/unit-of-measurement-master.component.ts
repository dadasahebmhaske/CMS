import { Component, OnInit } from '@angular/core';
import { IGridColumnDefs, IGridoption } from '../../../interface/igridoption';
import { AppComponent } from '../../../app.component';
import { DatashareService } from '../../../core/custom-services/datashare.service';
import { MasterService } from '../../../core/custom-services/master.service';
import { AppService } from '@app/core/custom-services/app.service';
import { AllmasterService } from '../allmaster.service';
@Component({
  selector: 'sa-unit-of-measurement-master',
  templateUrl: './unit-of-measurement-master.component.html',
  styleUrls: ['./unit-of-measurement-master.component.css']
})
export class UnitOfMeasurementMasterComponent implements OnInit {
    public cpInfo: any = {};
    public gridOptions: IGridoption;
    public transportData: any;
    constructor(private appService: AppService, private datashare: DatashareService, private masters: MasterService,private allmasterService:AllmasterService) {
    }
    ngOnInit() {
      this.appService.getAppData().subscribe(data => { this.cpInfo = data });
      this.configureGrid();
    }
    configureGrid() {
      this.gridOptions = <IGridoption>{}
      this.gridOptions.exporterMenuPdf = false;
      this.gridOptions.exporterExcelFilename = 'Unit of Measurement Master list.xlsx';
      this.gridOptions.selectionRowHeaderWidth = 0;
      let columnDefs = [];
      columnDefs = [
        {
          name: 'Select', displayName: 'Details', cellTemplate: '<button  style="margin:3px;" class="btn-primary btn-xs"  ng-click="grid.appScope.editEmployee(row.entity)"  ng-if="row.entity.IsActive!=null">&nbsp;Edit&nbsp;</button> '
          , width: "48",
          headerCellTemplate: '<div style="text-align: center;margin-top: 30px;">Edit</div>', enableFiltering: false
        },
       // { name: 'UOMId', displayName: 'Unit of Measurement Id', width: "*", cellTooltip: true, filterCellFiltered: true },
        { name: 'UOM', displayName: 'Unit of Measurement', width: "*", cellTooltip: true, filterCellFiltered: true },
        { name: 'IsActive', displayName: 'Active',cellClass:'text-center', width: "*", cellTooltip: true, filterCellFiltered: true },
      ]
      this.gridOptions.columnDefs = columnDefs;
      this.onLoad();
    }
    onEditFunction = ($event) => {
      this.datashare.updateShareData($event.row);
      AppComponent.Router.navigate(['/master/unit-of-measurement']);
    }
    onLoad() {
      this.allmasterService.getUOM('').subscribe((resData: any) => {
        if (resData.StatusCode != 0) {
          this.transportData = resData.Data;
          AppComponent.SmartAlert.Success(resData.Message);
        }
        else { this.transportData = [{}]; AppComponent.SmartAlert.Errmsg(resData.Message); }
      });
    }
  
  }
  