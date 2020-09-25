import { Component, OnInit, OnDestroy } from '@angular/core';
import { DatashareService } from '../../../core/custom-services/datashare.service';
import { AppComponent } from '../../../app.component';
import { AppService } from '@app/core/custom-services/app.service';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { AllmasterService } from '../allmaster.service';
@Component({
  selector: 'sa-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit, OnDestroy {
        public empInfo: any;
        public project: any = {RoleCode:''};
        public loaderbtn: boolean = true;
        public siteData:any=[];
        public minDate: Date= new Date();
        public maxDate: Date ;
        public datePickerConfig: Partial<BsDatepickerConfig>;
        constructor(private appService: AppService, private datashare: DatashareService,private allmasterService:AllmasterService) { 
          this.datePickerConfig = Object.assign({}, { containerClass: 'theme-orange', minDate: this.minDate, dateInputFormat: 'DD-MMM-YYYY', showWeekNumbers: false, adaptivePosition: true, isAnimated: true });
        }
        ngOnInit() {
          this.datashare.GetSharedData.subscribe(data => this.project = data == null ? { IsActive: 'Y',SiteId:'' } : data);
          this.appService.getAppData().subscribe(data => { this.empInfo = data });
          this.allOnloadMethods();
        }
        allOnloadMethods() {
          this.allmasterService.getSite().subscribe((resD: any) => {
            if (resD.StatusCode != 0) {
              this.siteData = resD.Data; 
            }
            else { this.siteData = []; AppComponent.SmartAlert.Errmsg(resD.Message); }
          });}
        public onSubmit() {
          this.loaderbtn = false;
          this.project.Flag = this.project.ProjectId == null ? 'IN' : 'UP';
          this.project.UserCode = this.empInfo.EmpId;
          this.project.ProjectId = this.project.ProjectId == null ? '' : this.project.ProjectId;
          let ciphertext = this.appService.getEncrypted(this.project);
          this.allmasterService.postProject(ciphertext).subscribe((resData: any) => {
            if (resData.StatusCode != 0) {
              AppComponent.SmartAlert.Success(resData.Message);
              AppComponent.Router.navigate(['/master/project-master']);
            }
            else { AppComponent.SmartAlert.Errmsg(resData.Message); }
          });
        }
        resetEndDate(val) {
          this.minDate = val;
          if (val != undefined && val != null && this.project.EndDate != null) {
            if ((new Date(this.project.EndDate).getTime()) < (new Date(val).getTime())) {
              this.project.EndDate = '';
            }
          }
      
        }
        ngOnDestroy() {
          this.datashare.updateShareData(null);
        }
      
      }
      