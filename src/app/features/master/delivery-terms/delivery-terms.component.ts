import { Component, OnInit, OnDestroy } from '@angular/core';
import { DatashareService } from '../../../core/custom-services/datashare.service';
import { AppComponent } from '../../../app.component';
import { AppService } from '@app/core/custom-services/app.service';
import { AllmasterService } from '../allmaster.service';
@Component({
  selector: 'sa-delivery-terms',
  templateUrl: './delivery-terms.component.html',
  styleUrls: ['./delivery-terms.component.css']
})
export class DeliveryTermsComponent implements OnInit, OnDestroy {
                  public empInfo: any;
                  public delivery: any = {};
                  public loaderbtn: boolean = true;
                  constructor(private appService: AppService, private datashare: DatashareService,private allmasterService:AllmasterService) { }
                  ngOnInit() {
                    this.datashare.GetSharedData.subscribe(data => this.delivery = data == null ? { IsActive: 'Y',RoleCode:'' } : data);
                    this.appService.getAppData().subscribe(data => { this.empInfo = data });
                  }
                  public onSubmit() {
                    this.loaderbtn = false;
                    this.delivery.Flag = this.delivery.DeliveryTermId == null ? 'IN' : 'UP';
                    this.delivery.UserCode = this.empInfo.EmpId;
                    this.delivery.DeliveryTermId = this.delivery.DeliveryTermId == null ? '' : this.delivery.DeliveryTermId;
                    let ciphertext = this.appService.getEncrypted(this.delivery);
                    this.allmasterService.post('ManageDeliveryTerm',ciphertext).subscribe((resData: any) => {
                      if (resData.StatusCode != 0) {
                        AppComponent.SmartAlert.Success(resData.Message);
                        AppComponent.Router.navigate(['/master/delivery-terms-master']);
                      }
                      else { AppComponent.SmartAlert.Errmsg(resData.Message); }
                    });
                  }
                  ngOnDestroy() {
                    this.datashare.updateShareData(null);
                  }
                
                }
                