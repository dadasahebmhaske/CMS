import { Component, OnInit } from '@angular/core';
import { IGridColumnDefs, IGridoption } from '../../../interface/igridoption';
import { AppComponent } from '../../../app.component';
import { DatashareService } from '../../../core/custom-services/datashare.service';
import { MasterService } from '../../../core/custom-services/master.service';
import { AppService } from '@app/core/custom-services/app.service';
import { AllmasterService } from '../allmaster.service';
@Component({
  selector: 'sa-company-master',
  templateUrl: './company-master.component.html',
  styleUrls: ['./company-master.component.css']
})
export class CompanyMasterComponent implements OnInit {
            public empInfo: any = {};
            public gridOptions: IGridoption;
            public companyTypeData: any;
            constructor(private appService: AppService, private datashare: DatashareService, private masters: MasterService,private allmasterService:AllmasterService) {
            }
            ngOnInit() {
              this.appService.getAppData().subscribe(data => { this.empInfo = data });
              this.configureGrid();
            }
            configureGrid() {
              this.gridOptions = <IGridoption>{}
              this.gridOptions.exporterMenuPdf = false;
              this.gridOptions.exporterExcelFilename = 'Company Master list.xlsx';
              this.gridOptions.selectionRowHeaderWidth = 0;
              let columnDefs = [];
              columnDefs = [
                {
                  name: 'Select', displayName: 'Details', cellTemplate: '<button  style="margin:3px;" class="btn-primary btn-xs"  ng-click="grid.appScope.editEmployee(row.entity)"  ng-if="row.entity.IsActive!=null">&nbsp;Edit&nbsp;</button> '
                  , width: "48",
                  headerCellTemplate: '<div style="text-align: center;margin-top: 30px;">Edit</div>', enableFiltering: false
                },
                { name: 'CompanyTypeName', displayName: 'Company Type', width: "*", cellTooltip: true, filterCellFiltered: true },
                { name: 'CompanyName', displayName: 'Company', width: "*", cellTooltip: true, filterCellFiltered: true },
                { name: 'Address', displayName: 'Address', width: "*", cellTooltip: true, filterCellFiltered: true },
                { name: 'CompanyPhoneNo', displayName: 'Company Phone No.',cellClass: 'cell-center', width: "*", cellTooltip: true, filterCellFiltered: true },
                { name: 'ContactPersonName', displayName: 'Contact Person Name', width: "*", cellTooltip: true, filterCellFiltered: true },
                { name: 'ContactPersonPhoneNo', displayName: 'Contact Person Phone No.',cellClass: 'cell-center', width: "*", cellTooltip: true, filterCellFiltered: true },
                { name: 'GSTNo', displayName: 'GSTN', width: "*",cellClass: 'cell-center', cellTooltip: true, filterCellFiltered: true },
                { name: 'PANNo', displayName: 'PAN',cellClass: 'cell-center', width: "*", cellTooltip: true, filterCellFiltered: true },
                { name: 'ContactPersonPhoneNo', displayName: 'Contact Person Phone No.',cellClass: 'cell-center', width: "*", cellTooltip: true, filterCellFiltered: true },
               
                 { name: 'IsActive', displayName: 'Active', width: "*", cellTooltip: true, filterCellFiltered: true },
              ] 
              this.gridOptions.columnDefs = columnDefs;
              this.onLoad();
            }
            onEditFunction = ($event) => {
              this.datashare.updateShareData($event.row);
              AppComponent.Router.navigate(['/master/company']);
            }
            onLoad() {
              this.allmasterService.getCompany().subscribe((resData: any) => {
                if (resData.StatusCode != 0) {
                  this.companyTypeData = resData.Data;
                  AppComponent.SmartAlert.Success(resData.Message);
                }
                else { this.companyTypeData = [{}]; AppComponent.SmartAlert.Errmsg(resData.Message); }
              });
          
            }
          
          }
          