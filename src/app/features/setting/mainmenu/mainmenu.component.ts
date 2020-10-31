import { Component, OnInit, OnDestroy } from '@angular/core';
import { DatashareService } from '../../../core/custom-services/datashare.service';
import { AppComponent } from '../../../app.component';

import { AppService } from '@app/core/custom-services/app.service';
import { SettingService } from '../setting.service';

@Component({
  selector: 'sa-mainmenu',
  templateUrl: './mainmenu.component.html',
  styleUrls: ['./mainmenu.component.css']
})
export class MainmenuComponent implements OnInit {
  public Menu:any={};empInfo:any={};
  public loaderbtn: boolean = true;

  constructor(private settingService:SettingService,private appService: AppService, private datashare: DatashareService) { }
  ngOnInit() {
    this.datashare.GetSharedData.subscribe(data => this.Menu = data == null ? { IsActive: 'Y' } : data);
    this.appService.getAppData().subscribe(data => { this.empInfo = data });
  }
  public onSubmit() {
    this.loaderbtn = false;
    this.Menu.MenuId = this.Menu.MenuId == null ? '' : this.Menu.MenuId;
    this.Menu.Flag = this.Menu.MenuId == null||this.Menu.MenuId == ''? 'IN' : 'UP';
    this.Menu.UserCode = this.empInfo.EmpId;
    this.Menu.AppId = 1001;
    //this.Menu.IsActive = 'Y';
   // this.Menu.MenuId = this.Menu.MenuId == null ? '' : this.Menu.MenuId;
    let ciphertext = this.appService.getEncrypted(this.Menu);
    this.settingService.post('/Settings/ManageMainMenuLvlOne',ciphertext).subscribe((resData: any) => {
      this.loaderbtn = true;
      if (resData.StatusCode != 0) {
        AppComponent.SmartAlert.Success(resData.Message);
        AppComponent.Router.navigate(['/setting/mainmenu-list']);
      }
      else { AppComponent.SmartAlert.Errmsg(resData.Message); }
    });
  }

  ngOnDestroy() {
    this.datashare.updateShareData(null);
  }

}
