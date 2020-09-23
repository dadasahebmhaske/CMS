import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { UigridreportDirective } from '../../core/directive/uigridreport.directive';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { RoleAccessGuard } from '@app/core/guards/roleAccess.guard';

import { routing,componentArray } from './report-routing.module';



@NgModule({
  declarations: [componentArray,UigridreportDirective],
  imports: [
    CommonModule,
    SharedModule,
    routing,
    
    BsDatepickerModule.forRoot(),
  ],
  exports:[UigridreportDirective],
  providers:[RoleAccessGuard]
})
export class ReportModule { }







