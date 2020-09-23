import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { routing,componentArray } from './master-routing.module';
import { UigridmasterDirective } from '../../core/directive/uigridmaster.directive';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { EmployeeService } from '@app/features/master/employee/employee.service';
import { RoleAccessGuard } from '@app/core/guards/roleAccess.guard';
import { AllmasterService } from '@app/features/master/allmaster.service';

@NgModule({
  declarations: [componentArray,UigridmasterDirective],
  imports: [
    CommonModule,
    SharedModule,
    routing,
    
    BsDatepickerModule.forRoot(),
  ],
  exports:[UigridmasterDirective],
  providers:[AllmasterService,EmployeeService,RoleAccessGuard]
})
export class MasterModule { }
