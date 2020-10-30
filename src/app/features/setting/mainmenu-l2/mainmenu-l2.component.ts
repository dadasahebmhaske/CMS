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
  public submenu:any={};empInfo:any={};MainMenuData:any=[];
  public loaderbtn: boolean = true;

  constructor(private settingService:SettingService,private appService: AppService, private datashare: DatashareService) { }
  ngOnInit() {
    this.datashare.GetSharedData.subscribe(data => this.submenu = data == null ? { IsActive: 'Y' } : data);
    this.appService.getAppData().subscribe(data => { this.empInfo = data });
  }

  public getAllonload() {
    // this.settingService.getMainMenu('Y').subscribe((resSData: any) => {
    //   if (resSData.StatusCode != 0) {
    //     this.MainMenuData = resSData.Data;
    //   }
    //   else { this.MainMenuData = []; AppComponent.SmartAlert.Errmsg(resSData.Message); }
    // });
  }

    // public onSubmit() {
  //   this.loaderbtn = false;
  //   this.Menu.Flag = this.Menu.DesigId == null ? 'IN' : 'UP';
  //   this.Menu.UserCode = this.empInfo.EmpId;
  //   this.Menu.DesigId = this.Menu.DesigId == null ? '' : this.Menu.DesigId;
  //   let ciphertext = this.appService.getEncrypted(this.Menu);
  //   this.allmasterService.post('ManageDesignation',ciphertext).subscribe((resData: any) => {
  //     this.loaderbtn = true;
  //     if (resData.StatusCode != 0) {
  //       AppComponent.SmartAlert.Success(resData.Message);
  //       AppComponent.Router.navigate(['/master/designation-master']);
  //     }
  //     else { AppComponent.SmartAlert.Errmsg(resData.Message); }
  //   });
  // }

}
