import { ModuleWithProviders } from "@angular/core"
import { Routes, RouterModule } from '@angular/router';
import { RoleAccessGuard } from '@app/core/guards/roleAccess.guard';

import { CostingOfProjectComponent } from './costing-of-project/costing-of-project.component';
import { PendingIndentsComponent } from './pending-indents/pending-indents.component';
import { PendingPoComponent } from './pending-po/pending-po.component';
import { PendingPaymentComponent } from './pending-payment/pending-payment.component';
import { PendingMaterialComponent } from './pending-material/pending-material.component';

const routes: Routes = [
  { path: 'costing-of-project', component: CostingOfProjectComponent , canActivate: [RoleAccessGuard],data: {formFlag: ['RPPBS']}},
  { path: 'pending-indents', component: PendingIndentsComponent , canActivate: [RoleAccessGuard],data: {formFlag: ['RPINS']}},
  { path: 'pending-po', component: PendingPoComponent , canActivate: [RoleAccessGuard],data: {formFlag: ['RPPOS']}},
  { path: 'pending-payment', component: PendingPaymentComponent , canActivate: [RoleAccessGuard],data: {formFlag: ['RPIPS']}},
  { path: 'pending-material', component: PendingMaterialComponent , canActivate: [RoleAccessGuard],data: {formFlag: ['RPMTS']}},
];


export const routing = [RouterModule.forChild(routes)]
//export class MasterRoutingModule { }
export const componentArray = [
  CostingOfProjectComponent,
  PendingIndentsComponent,
  PendingPoComponent,
  PendingPaymentComponent,
  PendingMaterialComponent

];