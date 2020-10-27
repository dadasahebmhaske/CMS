import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { UigridreportDirective } from '../../core/directive/uigridreport.directive';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { RoleAccessGuard } from '@app/core/guards/roleAccess.guard';
import { ProjectService } from '../project/project.service';
import { AllmasterService } from '../master/allmaster.service';
import { routing,componentArray } from './report-routing.module';
import { ReportService } from '../report/report.service';



@NgModule({
  declarations: [componentArray,UigridreportDirective],
  imports: [
    CommonModule,
    SharedModule,
    routing,
    
    BsDatepickerModule.forRoot(),
  ],
  exports:[UigridreportDirective],
  providers:[RoleAccessGuard,ProjectService,AllmasterService,ReportService]
})
export class ReportModule { }







