import { Component, OnInit, OnDestroy } from '@angular/core';
import { DatashareService } from '../../../core/custom-services/datashare.service';
import { AppComponent } from '../../../app.component';

import { AppService } from '@app/core/custom-services/app.service';
import { SettingService } from '../setting.service';

@Component({
  selector: 'sa-submenu-l3',
  templateUrl: './submenu-l3.component.html',
  styleUrls: ['./submenu-l3.component.css']
})
export class SubmenuL3Component implements OnInit {
  public submenu:any={};empInfo:any={};MainMenuData:any=[];submenul2Data:any=[];
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

    this.settingService.getSubMenuL2('Y').subscribe((resSData: any) => {
      if (resSData.StatusCode != 0) {
        this.submenul2Data = resSData.Data;
      }
      else { this.submenul2Data = []; AppComponent.SmartAlert.Errmsg(resSData.Message); }
    });
  }

  OnSelectMainMenu(MenuId){
    let obj;
    obj = this.settingService.filterData(this.submenul2Data, this.submenu.MenuId, 'MenuId');
    this.submenul2Data = obj;
  }

  public onSubmit() {
    this.loaderbtn = false;
    this.submenu.SubMenuLThreeId = this.submenu.SubMenuLThreeId == null ? '' : this.submenu.SubMenuLThreeId;
    this.submenu.Flag = this.submenu.SubMenuLThreeId == null||this.submenu.SubMenuLThreeId == ''? 'IN' : 'UP';
    this.submenu.UserCode = this.empInfo.EmpId;
    this.submenu.AppId = 1001;
   // this.submenu.IsActive = 'Y';
   // this.Menu.MenuId = this.Menu.MenuId == null ? '' : this.Menu.MenuId;
    let ciphertext = this.appService.getEncrypted(this.submenu);
    this.settingService.post('/Settings/ManageSubMenuLvlThree',ciphertext).subscribe((resData: any) => {
      this.loaderbtn = true;
      if (resData.StatusCode != 0) {
        AppComponent.SmartAlert.Success(resData.Message);
        AppComponent.Router.navigate(['/setting/submenuL3-list']);
      }
      else { AppComponent.SmartAlert.Errmsg(resData.Message); }
    });
  }

  ngOnDestroy() {
    this.datashare.updateShareData(null);
  }

}
