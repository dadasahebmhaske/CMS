import { Component, OnInit, OnDestroy } from '@angular/core';
import { DatashareService } from '../../../core/custom-services/datashare.service';
import { AppComponent } from '../../../app.component';

import { AppService } from '@app/core/custom-services/app.service';
import { AllmasterService } from '../allmaster.service';
@Component({
  selector: 'sa-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit, OnDestroy {
    public empInfo: any;
    public dept: any = {};
    public loaderbtn: boolean = true;
    constructor(private appService: AppService, private datashare: DatashareService,private almasterService:AllmasterService) { }
    ngOnInit() {
      this.datashare.GetSharedData.subscribe(data => this.dept = data == null ? { IsActive: 'Y' } : data);
      this.appService.getAppData().subscribe(data => { this.empInfo = data });
    }
    public onSubmit() {
      this.loaderbtn = false;
      this.dept.Flag = this.dept.DeptId == null ? 'IN' : 'UP';
      this.dept.UserCode = this.empInfo.EmpId;
      this.dept.DeptId = this.dept.DeptId == null ? '' : this.dept.DeptId;
      let ciphertext = this.appService.getEncrypted(this.dept);
      this.almasterService.post('ManageDepartment',ciphertext).subscribe((resData: any) => {
        this.loaderbtn = true;
        if (resData.StatusCode != 0) {
          AppComponent.SmartAlert.Success(resData.Message);
          AppComponent.Router.navigate(['/master/department-master']);
        }
        else { AppComponent.SmartAlert.Errmsg(resData.Message); }
      });
    }
    ngOnDestroy() {
      this.datashare.updateShareData(null);
    }
  
  }
  