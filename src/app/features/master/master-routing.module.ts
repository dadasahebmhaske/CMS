
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
  { path: 'department-master', component: DepartmentMasterComponent , canActivate: [RoleAccessGuard],data: {formFlag: ['MDPMA']}},
  { path: 'department', component: DepartmentComponent , canActivate: [RoleAccessGuard],data: {formFlag: ['MDPMA']}},
  { path: 'designation-master', component: DesignationMasterComponent , canActivate: [RoleAccessGuard],data: {formFlag: ['MDSMA']}},
  { path: 'designation', component: DesignationComponent , canActivate: [RoleAccessGuard],data: {formFlag: ['MDSMA']}},
  { path: 'employee-master', component: EmployeeMasterComponent,canActivate: [RoleAccessGuard],data: {formFlag: ['MEMMA']}},
  { path: 'employee', component: EmployeeComponent,canActivate: [RoleAccessGuard],data: {formFlag: ['MEMMA']}},
  { path: 'site-master', component: SiteMasterComponent, canActivate: [RoleAccessGuard],data: {formFlag: ['MSIMA']}},
  { path: 'site', component: SiteComponent, canActivate: [RoleAccessGuard],data: {formFlag: ['MSIMA']}},
  { path: 'project-master', component: ProjectMasterComponent, canActivate: [RoleAccessGuard],data: {formFlag: ['MPJMA']}},
  { path: 'project', component: ProjectComponent, canActivate: [RoleAccessGuard],data: {formFlag: ['MPJMA']}},
  { path: 'company-master', component: CompanyMasterComponent, canActivate: [RoleAccessGuard],data: {formFlag: ['MCPMA']}},
  { path: 'company', component: CompanyComponent, canActivate: [RoleAccessGuard],data: {formFlag: ['MCPMA']}},
  { path: 'material-master', component: MaterialMasterComponent, canActivate: [RoleAccessGuard],data: {formFlag: ['MMAMA']}},
  { path: 'material', component: MaterialComponent, canActivate: [RoleAccessGuard],data: {formFlag: ['MMAMA']}},
  { path: 'material-type-master', component: MaterialTypeMasterComponent, canActivate: [RoleAccessGuard],data: {formFlag: ['MMTMA']}},
  { path: 'material-type', component: MaterialTypeComponent, canActivate: [RoleAccessGuard],data: {formFlag: ['MMTMA']}},
  { path: 'labor-rate-master', component: LaborRateMasterComponent, canActivate: [RoleAccessGuard],data: {formFlag: ['MLWMA']}},
  { path: 'labor-rate', component: LaborRateComponent, canActivate: [RoleAccessGuard],data: {formFlag: ['MLWMA']}},
  { path: 'taxation-master', component: TaxationMasterComponent , canActivate: [RoleAccessGuard],data: {formFlag: ['MTXMA']}},
{ path: 'taxation', component: TaxationComponent , canActivate: [RoleAccessGuard],data: {formFlag: ['MTXMA']}},
{ path: 'payment-terms-master', component: PaymentTermsMasterComponent , canActivate: [RoleAccessGuard],data: {formFlag: ['MLWMA']}},
{ path: 'payment-terms', component: PaymentTermsComponent , canActivate: [RoleAccessGuard],data: {formFlag: ['MLWMA']}},
{ path: 'delivery-terms-master', component: DeliveryTermsMasterComponent, canActivate: [RoleAccessGuard],data: {formFlag: ['MDTMA']}},
{ path: 'delivery-terms', component: DeliveryTermsComponent, canActivate: [RoleAccessGuard],data: {formFlag: ['MDTMA']}},
{ path: 'labour-master', component: LabourMasterComponent , canActivate: [RoleAccessGuard],data: {formFlag: ['MPTMA']}},
{ path: 'labour', component: LabourComponent , canActivate: [RoleAccessGuard],data: {formFlag: ['MPTMA']}},
{ path: 'unit-of-measurement-master', component: UnitOfMeasurementMasterComponent  , canActivate: [RoleAccessGuard],data: {formFlag: ['MUMMA']}},
{ path: 'unit-of-measurement', component: UnitOfMeasurementComponent  , canActivate: [RoleAccessGuard],data: {formFlag: ['MUMMA']}},
{ path: 'other-expenses-master', component: OtherExpensesMasterComponent , canActivate: [RoleAccessGuard],data: {formFlag: ['MOEMA']}},
{ path: 'other-expenses', component: OtherExpensesComponent , canActivate: [RoleAccessGuard],data: {formFlag: ['MOEMA']}},
{ path: 'company-type-master', component: CompanyTypeMasterComponent, canActivate: [RoleAccessGuard],data: {formFlag: ['MCTMA']}},
{ path: 'company-type', component: CompanyTypeComponent, canActivate: [RoleAccessGuard],data: {formFlag: ['MCTMA']}},

  
 
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