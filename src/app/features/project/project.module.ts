import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { routing,componentArray } from './project-routing.module';
import { UigridprojectDirective } from '../../core/directive/uigridproject.directive';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { RoleAccessGuard } from '@app/core/guards/roleAccess.guard';


@NgModule({
  declarations: [componentArray,UigridprojectDirective],
  imports: [
    CommonModule,
    SharedModule,
    routing,
    
    BsDatepickerModule.forRoot(),
  ],
  exports:[UigridprojectDirective],
  providers:[RoleAccessGuard]
})
export class ProjectModule { }
