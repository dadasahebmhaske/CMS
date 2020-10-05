import { Component, OnInit } from '@angular/core';
import { IGridColumnDefs, IGridoption } from '../../../interface/igridoption';
import { AppComponent } from '../../../app.component';
import { DatashareService } from '../../../core/custom-services/datashare.service';
import { MasterService } from '../../../core/custom-services/master.service';
import { AppService } from '@app/core/custom-services/app.service';
import { AllmasterService } from '../allmaster.service';
@Component({
  selector: 'sa-material-master',
  templateUrl: './material-master.component.html',
  styleUrls: ['./material-master.component.css']
})
export class MaterialMasterComponent implements OnInit {
              public cpInfo: any = {};
              public gridOptions: IGridoption;
              public materialData: any;
              constructor(private appService: AppService, private datashare: DatashareService, private masters: MasterService,private allmasterService:AllmasterService) {
              }
              ngOnInit() {
                this.appService.getAppData().subscribe(data => { this.cpInfo = data });
                this.configureGrid();
              }
              configureGrid() {
                this.gridOptions = <IGridoption>{}
                this.gridOptions.exporterMenuPdf = false;
                this.gridOptions.exporterExcelFilename = 'Material Master list.xlsx';
                this.gridOptions.selectionRowHeaderWidth = 0;
                let columnDefs = [];
                columnDefs = [
                  {
                    name: 'Select', displayName: 'Details', cellTemplate: '<button  style="margin:3px;" class="btn-primary btn-xs"  ng-click="grid.appScope.editEmployee(row.entity)"  ng-if="row.entity.IsActive!=null">&nbsp;Edit&nbsp;</button> '
                    , width: "48",
                    headerCellTemplate: '<div style="text-align: center;margin-top: 30px;">Edit</div>', enableFiltering: false
                  },
                  { name: 'MatName', displayName: 'Material Name', width: "*", cellTooltip: true, filterCellFiltered: true },
                  { name: 'UOM', displayName: 'Unit Of Measurement', width: "*", cellTooltip: true, filterCellFiltered: true },
                  { name: 'IsActive', displayName: 'Active', cellClass: 'cell-center', width: "*", cellTooltip: true, filterCellFiltered: true },
                ]
                this.gridOptions.columnDefs = columnDefs;
                this.onLoad();
              }
              onEditFunction = ($event) => {
                $event.row.UOM=$event.row.UOMId;
                this.datashare.updateShareData($event.row);
                AppComponent.Router.navigate(['/master/material']);
              }
              onLoad() {
                this.allmasterService.getMaterial('').subscribe((resData: any) => {
                  if (resData.StatusCode != 0) {
                    this.materialData = resData.Data;
                    AppComponent.SmartAlert.Success(resData.Message);
                  }
                  else { this.materialData = [{}]; AppComponent.SmartAlert.Errmsg(resData.Message); }
                });
            
              }
            
            }
            