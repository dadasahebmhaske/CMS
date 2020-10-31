import { Component, OnInit, OnDestroy } from '@angular/core';
import { DatashareService } from '../../../core/custom-services/datashare.service';
import { AppComponent } from '../../../app.component';

import { AppService } from '@app/core/custom-services/app.service';
import { SettingService } from '../setting.service';

@Component({
  selector: 'sa-mainmenu-l2',
  templateUrl: './mainmenu-l2.component.html',
  styleUrls: ['./mainmenu-l2.component.css']
})
export class MainmenuL2Component implements OnInit {
  public submenu:any={MenuId:""};empInfo:any={};MainMenuData:any=[];
  public loaderbtn: boolean = true;

  constructor(private settingService:SettingService,private appService: AppService, private datashare: DatashareService) { }
  ngOnInit() {
    this.datashare.GetSharedData.subscribe(data => this.submenu = data == null ? { IsActive: 'Y' } : data);
    this.appService.getAppData().subscribe(data => { this.empInfo = data });
    this.getAllonload();
  }

  public getAllonload() {
    this.settingService.getMainMenuL1('Y').subscribe((resSData: any) => {
      if (resSData.StatusCode != 0) {
        this.MainMenuData = resSData.Data;
      }
      else { this.MainMenuData = []; AppComponent.SmartAlert.Errmsg(resSData.Message); }
    });
  }

  public onSubmit() {
    this.loaderbtn = false;
    this.submenu.SubMenuId = this.submenu.SubMenuId == null ? '' : this.submenu.SubMenuId;
    this.submenu.Flag = this.submenu.SubMenuId == null||this.submenu.SubMenuId == ''? 'IN' : 'UP';
    this.submenu.UserCode = this.empInfo.EmpId;
    this.submenu.AppId = 1001;
    //this.submenu.IsActive = 'Y';
   // this.Menu.MenuId = this.Menu.MenuId == null ? '' : this.Menu.MenuId;
    let ciphertext = this.appService.getEncrypted(this.submenu);
    this.settingService.post('/Settings/ManageSubMenuLvlTwo',ciphertext).subscribe((resData: any) => {
      this.loaderbtn = true;
      if (resData.StatusCode != 0) {
        AppComponent.SmartAlert.Success(resData.Message);
        AppComponent.Router.navigate(['/setting/submenuL2-list']);
      }
      else { AppComponent.SmartAlert.Errmsg(resData.Message); }
    });
  }

  ngOnDestroy() {
    this.datashare.updateShareData(null);
  }

}
