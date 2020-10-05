import { Component, OnInit } from '@angular/core';
import { IGridColumnDefs, IGridoption } from '../../../interface/igridoption';
import { AppComponent } from '../../../app.component';
import { DatashareService } from '../../../core/custom-services/datashare.service';
import { MasterService } from '../../../core/custom-services/master.service';
import { AppService } from '@app/core/custom-services/app.service';
import { AllmasterService } from '../allmaster.service';
@Component({
  selector: 'sa-material-type-master',
  templateUrl: './material-type-master.component.html',
  styleUrls: ['./material-type-master.component.css']
})
export class MaterialTypeMasterComponent implements OnInit {

                public cpInfo: any = {};
                public gridOptions: IGridoption;
                public matActData: any;
                public MAID:any;
                public mat:string;
                constructor(private appService: AppService, private datashare: DatashareService, private masters: MasterService,private allmasterService:AllmasterService) {
                }
                ngOnInit() {
                  this.appService.getAppData().subscribe(data => { this.cpInfo = data });
                  this.MAID=2;
                  this.onLoad(this.MAID);
                }
                configureGrid() {
                  this.gridOptions = <IGridoption>{}
                  this.gridOptions.exporterMenuPdf = false;
                  this.gridOptions.exporterExcelFilename = 'Material / Activity Type Master list.xlsx';
                  this.gridOptions.selectionRowHeaderWidth = 0;
                  let columnDefs = [];
                  columnDefs = [
                    {
                      name: 'Select', displayName: 'Details', cellTemplate: '<button  style="margin:3px;" class="btn-primary btn-xs"  ng-click="grid.appScope.editEmployee(row.entity)"  ng-if="row.entity.IsActive!=null">&nbsp;Edit&nbsp;</button> '
                      , width: "48",
                      headerCellTemplate: '<div style="text-align: center;margin-top: 30px;">Edit</div>', enableFiltering: false
                    },
                    { name: 'MainTypeName', displayName: 'Main Type ', width: "*", cellTooltip: true, filterCellFiltered: true },
                    { name: 'TypeName', displayName: this.mat, width: "*", cellTooltip: true, filterCellFiltered: true,},
                   { name: 'IsActive', displayName: 'Active', cellClass: 'cell-center', width: "*", cellTooltip: true, filterCellFiltered: true },
                  ]
                  this.gridOptions.columnDefs = columnDefs;
                
                }
                onEditFunction = ($event) => {
                  this.datashare.updateShareData($event.row);
                  AppComponent.Router.navigate(['/master/material-type']);
                }
                onLoad(id) {
                 this.mat= this.MAID==4?'Other Type':( this.MAID==2?'Material Type':'Activity Type');
                  this.configureGrid();
                  this.allmasterService.getType(id).subscribe((resData: any) => {
                    if (resData.StatusCode != 0) {
                      this.matActData = resData.Data; console.log(resData.Data);
                      AppComponent.SmartAlert.Success(resData.Message);
                    }
                    else { this.matActData = [{}]; AppComponent.SmartAlert.Errmsg(resData.Message); }
                  });
              
                }
              
              }
              