import { Component, OnInit, OnDestroy } from '@angular/core';
import { DatashareService } from '../../../core/custom-services/datashare.service';
import { AppComponent } from '../../../app.component';
import { AppService } from '@app/core/custom-services/app.service';
import { AllmasterService } from '../allmaster.service';

@Component({
  selector: 'sa-other-expenses',
  templateUrl: './other-expenses.component.html',
  styleUrls: ['./other-expenses.component.css']
})
export class OtherExpensesComponent implements OnInit, OnDestroy {
        public empInfo: any;
        public expenses: any = {};
        public loaderbtn: boolean = true;
        constructor(private appService: AppService, private datashare: DatashareService,private allmasterService:AllmasterService) { }
        ngOnInit() {
          this.datashare.GetSharedData.subscribe(data => this.expenses = data == null ? { IsActive: 'Y' } : data);
          this.appService.getAppData().subscribe(data => { this.empInfo = data });
        }
        public onSubmit() {
          this.loaderbtn = false;
          this.expenses.Flag = this.expenses.OtherExpId == null ? 'IN' : 'UP';
          this.expenses.UserCode = this.empInfo.EmpId;
          this.expenses.OtherExpId = this.expenses.OtherExpId == null ? '' : this.expenses.OtherExpId;
          let ciphertext = this.appService.getEncrypted(this.expenses);
          this.allmasterService.post('ManageOtherExp',ciphertext).subscribe((resData: any) => {
            this.loaderbtn = true;
            if (resData.StatusCode != 0) {
              AppComponent.SmartAlert.Success(resData.Message);
              AppComponent.Router.navigate(['/master/other-expenses-master']);
            }
            else { AppComponent.SmartAlert.Errmsg(resData.Message); }
          });
        }
        ngOnDestroy() {
          this.datashare.updateShareData(null);
        }
      
      }
      