import { Component, OnInit, OnDestroy } from '@angular/core';
import { DatashareService } from '../../../core/custom-services/datashare.service';
import { AppComponent } from '../../../app.component';
import { AppService } from '@app/core/custom-services/app.service';
import { AllmasterService } from '../allmaster.service';
@Component({
  selector: 'sa-payment-terms',
  templateUrl: './payment-terms.component.html',
  styleUrls: ['./payment-terms.component.css']
})
export class PaymentTermsComponent implements OnInit, OnDestroy {
                public empInfo: any;
                public payment: any = {RoleCode:''};
                public loaderbtn: boolean = true;
                constructor(private appService: AppService, private datashare: DatashareService,private allmasterService:AllmasterService) { }
                ngOnInit() {
                  this.datashare.GetSharedData.subscribe(data => this.payment = data == null ? { IsActive: 'Y',RoleCode:'' } : data);
                  this.appService.getAppData().subscribe(data => { this.empInfo = data });
                }
                public onSubmit() {
                  this.loaderbtn = false;
                  this.payment.Flag = this.payment.PayTermId == null ? 'IN' : 'UP';
                  this.payment.UserCode = this.empInfo.EmpId;
                    this.payment.PayTermId = this.payment.PayTermId == null ? '' : this.payment.PayTermId;
                   let ciphertext = this.appService.getEncrypted(this.payment);
                  this.allmasterService.post('ManagePayTerm',ciphertext).subscribe((resData: any) => {
                    this.loaderbtn = true;
                    if (resData.StatusCode != 0) {
                      AppComponent.SmartAlert.Success(resData.Message);
                      AppComponent.Router.navigate(['/master/payment-terms-master']);
                    }
                    else { AppComponent.SmartAlert.Errmsg(resData.Message); }
                  });
                }
                ngOnDestroy() {
                  this.datashare.updateShareData(null);
                }
              
              }
              