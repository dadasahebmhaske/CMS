import { Component, OnInit, OnDestroy } from '@angular/core';
import { DatashareService } from '../../../core/custom-services/datashare.service';
import { AppComponent } from '../../../app.component';
import { AppService } from '@app/core/custom-services/app.service';
import { AllmasterService } from '../allmaster.service';
@Component({
  selector: 'sa-taxation',
  templateUrl: './taxation.component.html',
  styleUrls: ['./taxation.component.css']
})
export class TaxationComponent implements OnInit, OnDestroy {
              public empInfo: any;
              public tax: any = {};
              public loaderbtn: boolean = true;
              constructor(private appService: AppService, private datashare: DatashareService,private allmasterService:AllmasterService) { }
              ngOnInit() {
                this.datashare.GetSharedData.subscribe(data => this.tax = data == null ? { IsActive: 'Y',TaxTerm:'' } : data);
                this.appService.getAppData().subscribe(data => { this.empInfo = data });
              }
              public onSubmit() {
                this.loaderbtn = false;
                this.tax.Flag = this.tax.TaxId == null ? 'IN' : 'UP';
                this.tax.UserCode = this.empInfo.EmpId;
                this.tax.TaxId = this.tax.TaxId == null ? '' : this.tax.TaxId;
                let ciphertext = this.appService.getEncrypted(this.tax);
                this.allmasterService.post('ManageTaxation',ciphertext).subscribe((resData: any) => {
                  this.loaderbtn = true;
                  if (resData.StatusCode != 0) {
                    AppComponent.SmartAlert.Success(resData.Message);
                    AppComponent.Router.navigate(['/master/taxation-master']);
                  }
                  else { AppComponent.SmartAlert.Errmsg(resData.Message); }
                });
              }
              ngOnDestroy() {
                this.datashare.updateShareData(null);
              }
            
            }
            