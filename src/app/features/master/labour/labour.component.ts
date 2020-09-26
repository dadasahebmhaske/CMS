
import { Component, OnInit, OnDestroy } from '@angular/core';
import { DatashareService } from '../../../core/custom-services/datashare.service';
import { AppComponent } from '../../../app.component';
import { AppService } from '@app/core/custom-services/app.service';
import { AllmasterService } from '../allmaster.service';
@Component({
  selector: 'sa-labour',
  templateUrl: './labour.component.html',
  styleUrls: ['./labour.component.css']
})
export class LabourComponent implements OnInit, OnDestroy {
              public empInfo: any;
              public labour: any = {};
              public designationData:any=[];
              public loaderbtn: boolean = true;
              constructor(private appService: AppService, private datashare: DatashareService,private allmasterService:AllmasterService) { }
              ngOnInit() {
                this.datashare.GetSharedData.subscribe(data => this.labour = data == null ? { IsActive: 'Y',DesigId:'' } : data);
                this.appService.getAppData().subscribe(data => { this.empInfo = data });
                   this.allOnloadMethods();
              } 
              allOnloadMethods() {
                this.allmasterService.getDesignation().subscribe((resD: any) => {
                  if (resD.StatusCode != 0) {
                    this.designationData = resD.Data;
                  }
                  else { this.designationData = []; AppComponent.SmartAlert.Errmsg(resD.Message); }
                });
              }
              public onSubmit() {
                this.loaderbtn = false;
                this.labour.Flag = this.labour.LabourId == null ? 'IN' : 'UP';
                this.labour.UserCode = this.empInfo.EmpId;
                this.labour.LabourId = this.labour.LabourId == null ? '' : this.labour.LabourId;
               let ciphertext = this.appService.getEncrypted(this.labour);
                this.allmasterService.post('ManageLabour',ciphertext).subscribe((resData: any) => {
                  if (resData.StatusCode != 0) {
                    AppComponent.SmartAlert.Success(resData.Message);
                    AppComponent.Router.navigate(['/master/labour-master']);
                  }
                  else { AppComponent.SmartAlert.Errmsg(resData.Message); }
                });
              }
              ngOnDestroy() {
                this.datashare.updateShareData(null);
              }
            
            }
            