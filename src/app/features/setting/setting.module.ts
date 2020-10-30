import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
//import { UigridreportDirective } from '../../core/directive/uigridreport.directive';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { RoleAccessGuard } from '@app/core/guards/roleAccess.guard';
import { ProjectService } from '../project/project.service';
import { AllmasterService } from '../master/allmaster.service';
import { routing,componentArray } from './setting-routing.module';
import { SettingService } from '../setting/setting.service';
import { UigridsettingDirective } from '../../core/directive/uigridsetting.directive';
@NgModule({
  declarations: [componentArray,UigridsettingDirective],
  imports: [
    CommonModule,
    SharedModule,
    routing,
    BsDatepickerModule.forRoot(),
  ],
  exports:[],
  providers:[RoleAccessGuard,ProjectService,AllmasterService,UigridsettingDirective,SettingService]
})
export class SettingModule { }
