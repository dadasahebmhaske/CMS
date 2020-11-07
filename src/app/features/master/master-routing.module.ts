
import { ModuleWithProviders } from "@angular/core"
import { Routes, RouterModule } from '@angular/router';
import { RoleAccessGuard } from '@app/core/guards/roleAccess.guard';

import { DepartmentMasterComponent } from './department-master/department-master.component';
import { DepartmentComponent } from './department/department.component';
import { DesignationMasterComponent } from './designation-master/designation-master.component';
import { DesignationComponent } from './designation/designation.component';
import { EmployeeMasterComponent } from './employee-master/employee-master.component';
import { EmployeeComponent } from './employee/employee.component';
import { SiteMasterComponent } from './site-master/site-master.component';
import { SiteComponent } from './site/site.component';
import { ProjectMasterComponent } from './project-master/project-master.component';
import { ProjectComponent } from './project/project.component';
import { CompanyMasterComponent } from './company-master/company-master.component';
import { CompanyComponent } from './company/company.component';
import { MaterialMasterComponent } from './material-master/material-master.component';
import { MaterialComponent } from './material/material.component';
import { LaborRateMasterComponent } from './labor-rate-master/labor-rate-master.component';
import { LaborRateComponent } from './labor-rate/labor-rate.component';
import { TaxationMasterComponent } from './taxation-master/taxation-master.component';
import { TaxationComponent } from './taxation/taxation.component';
import { PaymentTermsMasterComponent } from './payment-terms-master/payment-terms-master.component';
import { PaymentTermsComponent } from './payment-terms/payment-terms.component';
import { DeliveryTermsMasterComponent } from './delivery-terms-master/delivery-terms-master.component';
import { DeliveryTermsComponent } from './delivery-terms/delivery-terms.component';
import { MaterialTypeMasterComponent } from './material-type-master/material-type-master.component';
import { MaterialTypeComponent } from './material-type/material-type.component';
import { LabourMasterComponent } from './labour-master/labour-master.component';
import { LabourComponent } from './labour/labour.component';
import { UnitOfMeasurementMasterComponent } from './unit-of-measurement-master/unit-of-measurement-master.component';
import { UnitOfMeasurementComponent } from './unit-of-measurement/unit-of-measurement.component';
import { OtherExpensesMasterComponent } from './other-expenses-master/other-expenses-master.component';
import { OtherExpensesComponent } from './other-expenses/other-expenses.component';
import { CompanyTypeMasterComponent } from './company-type-master/company-type-master.component';
import { CompanyTypeComponent } from './company-type/company-type.component';

const routes: Routes = [
  { path: 'department-master', component: DepartmentMasterComponent },
  { path: 'department', component: DepartmentComponent },
  { path: 'designation-master', component: DesignationMasterComponent },
  { path: 'designation', component: DesignationComponent },
  { path: 'employee-master', component: EmployeeMasterComponent},
  { path: 'employee', component: EmployeeComponent},
  { path: 'site-master', component: SiteMasterComponent, canActivate: [RoleAccessGuard],data: {formFlag: ['MSIMA']}},
  { path: 'site', component: SiteComponent, canActivate: [RoleAccessGuard],data: {formFlag: ['MSIMA']}},
  { path: 'project-master', component: ProjectMasterComponent},
  { path: 'project', component: ProjectComponent},
  { path: 'company-master', component: CompanyMasterComponent},
  { path: 'company', component: CompanyComponent},
  { path: 'material-master', component: MaterialMasterComponent},
  { path: 'material', component: MaterialComponent},
  { path: 'material-type-master', component: MaterialTypeMasterComponent},
  { path: 'material-type', component: MaterialTypeComponent},
  { path: 'labor-rate-master', component: LaborRateMasterComponent},
  { path: 'labor-rate', component: LaborRateComponent},
  { path: 'taxation-master', component: TaxationMasterComponent },
{ path: 'taxation', component: TaxationComponent },
{ path: 'payment-terms-master', component: PaymentTermsMasterComponent },
{ path: 'payment-terms', component: PaymentTermsComponent },
{ path: 'delivery-terms-master', component: DeliveryTermsMasterComponent},
{ path: 'delivery-terms', component: DeliveryTermsComponent},
{ path: 'labour-master', component: LabourMasterComponent },
{ path: 'labour', component: LabourComponent },
{ path: 'unit-of-measurement-master', component: UnitOfMeasurementMasterComponent },
{ path: 'unit-of-measurement', component: UnitOfMeasurementComponent },
{ path: 'other-expenses-master', component: OtherExpensesMasterComponent },
{ path: 'other-expenses', component: OtherExpensesComponent },
{ path: 'company-type-master', component: CompanyTypeMasterComponent},
{ path: 'company-type', component: CompanyTypeComponent},

  
 
];

// @NgModule({
//   imports: [RouterModule.forChild(routes)],
//   exports: [RouterModule]
// })
export const routing = [RouterModule.forChild(routes)]
//export class MasterRoutingModule { }
export const componentArray = [
  DepartmentMasterComponent,
  DepartmentComponent,
  DesignationMasterComponent,
  DesignationComponent,
  EmployeeComponent, 
  EmployeeMasterComponent, 
  SiteMasterComponent,
  SiteComponent,
  ProjectMasterComponent,
  ProjectComponent,
  CompanyMasterComponent,
  CompanyComponent,
  MaterialMasterComponent,
  MaterialComponent,
  LaborRateMasterComponent,
  LaborRateComponent,
  TaxationMasterComponent,
  TaxationComponent,
  PaymentTermsMasterComponent,
  PaymentTermsComponent,
  DeliveryTermsMasterComponent,
  DeliveryTermsComponent,
  MaterialTypeMasterComponent,
  MaterialTypeComponent,
  LabourMasterComponent,
  LabourComponent,
  UnitOfMeasurementMasterComponent,
  UnitOfMeasurementComponent,
  OtherExpensesMasterComponent,
  OtherExpensesComponent,
  CompanyTypeMasterComponent,
  CompanyTypeComponent
];