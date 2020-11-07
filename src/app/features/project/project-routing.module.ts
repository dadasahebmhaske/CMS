
import { ModuleWithProviders } from "@angular/core"
import { Routes, RouterModule } from '@angular/router';
import { RoleAccessGuard } from '@app/core/guards/roleAccess.guard';
import { ProjectBudgetListComponent } from './project-budget-list/project-budget-list.component';
import { ProjectBudgetComponent } from './project-budget/project-budget.component';
import { RaiseIndentComponent } from './raise-indent/raise-indent.component';
import { RaiseIndentListComponent } from './raise-indent-list/raise-indent-list.component';
import { GeneratePoListComponent } from './generate-po-list/generate-po-list.component';
import { GeneratePoComponent } from './generate-po/generate-po.component';
import { GrnListComponent } from './grn-list/grn-list.component';
import { GrnComponent } from './grn/grn.component';
import { LabourContractListComponent } from './labour-contract-list/labour-contract-list.component';
import { LabourContractComponent } from './labour-contract/labour-contract.component';
import { PaymentDetailsListComponent } from './payment-details-list/payment-details-list.component';
import { PaymentDetailsComponent } from './payment-details/payment-details.component';
import { MaterialIssueSlipListComponent } from './material-issue-slip-list/material-issue-slip-list.component';
import { MaterialIssueSlipComponent } from './material-issue-slip/material-issue-slip.component';
import { MInvoiceDetailsListComponent } from './m-invoice-details-list/m-invoice-details-list.component';
import { MInvoiceDetailsComponent } from './m-invoice-details/m-invoice-details.component';
import { WcInvoiceDetailsListComponent } from './wc-invoice-details-list/wc-invoice-details-list.component';
import { WcInvoiceDetailsComponent } from './wc-invoice-details/wc-invoice-details.component';
import { WcPaymentDetailsListComponent } from './wc-payment-details-list/wc-payment-details-list.component';
import { WcPaymentDetailsComponent } from './wc-payment-details/wc-payment-details.component';
import { LabourWorkPaymentDeatilsListComponent } from './labour-work-payment-deatils-list/labour-work-payment-deatils-list.component';
import { LabourWorkPaymentDeatilsComponent } from './labour-work-payment-deatils/labour-work-payment-deatils.component';
import { WeeklyPayoutListComponent } from './weekly-payout-list/weekly-payout-list.component';
import { WeeklyPayoutComponent } from './weekly-payout/weekly-payout.component';
import { DwPaymentDetailsListComponent } from './dw-payment-details-list/dw-payment-details-list.component';
import { DwPaymentDetailsComponent } from './dw-payment-details/dw-payment-details.component';


const routes: Routes = [
  { path: 'project-budget-list', component: ProjectBudgetListComponent, canActivate: [RoleAccessGuard],data: {formFlag: ['PRBDG']}},
  { path: 'project-budget', component: ProjectBudgetComponent , canActivate: [RoleAccessGuard],data: {formFlag: ['PRBDG']}},
  { path: 'raise-indent-list', component: RaiseIndentListComponent , canActivate: [RoleAccessGuard],data: {formFlag: ['MATRI']}},
  { path: 'raise-indent', component: RaiseIndentComponent , canActivate: [RoleAccessGuard],data: {formFlag: ['MATRI']}},
  { path: 'generate-po-list', component: GeneratePoListComponent , canActivate: [RoleAccessGuard],data: {formFlag: ['MATGP']}},
  { path: 'generate-po', component: GeneratePoComponent , canActivate: [RoleAccessGuard],data: {formFlag: ['MATGP']}},
  { path: 'grn-list', component: GrnListComponent , canActivate: [RoleAccessGuard],data: {formFlag: ['MTGRN']}},
  { path: 'grn', component: GrnComponent , canActivate: [RoleAccessGuard],data: {formFlag: ['MTGRN']}},
  { path: 'labour-contract-list', component: LabourContractListComponent , canActivate: [RoleAccessGuard],data: {formFlag: ['LBWC']}},
  { path: 'labour-contract', component: LabourContractComponent , canActivate: [RoleAccessGuard],data: {formFlag: ['LBWC']}},
  { path: 'payment-details-list', component: PaymentDetailsListComponent , canActivate: [RoleAccessGuard],data: {formFlag: ['MTPMD']}},
  { path: 'payment-details', component: PaymentDetailsComponent , canActivate: [RoleAccessGuard],data: {formFlag: ['MTPMD']}},
  { path: 'material-issue-slip-list', component: MaterialIssueSlipListComponent , canActivate: [RoleAccessGuard],data: {formFlag: ['MTISL']}},
  { path: 'material-issue-slip', component: MaterialIssueSlipComponent , canActivate: [RoleAccessGuard],data: {formFlag: ['MTISL']}},
  { path: 'm-invoice-details-list', component: MInvoiceDetailsListComponent, canActivate: [RoleAccessGuard],data: {formFlag: ['MTINV']}},
{ path: 'm-invoice-details', component: MInvoiceDetailsComponent , canActivate: [RoleAccessGuard],data: {formFlag: ['MTINV']}},
{ path: 'wc-invoice-details-list', component: WcInvoiceDetailsListComponent , canActivate: [RoleAccessGuard],data: {formFlag: ['LBINV']}},
{ path: 'wc-invoice-details', component: WcInvoiceDetailsComponent , canActivate: [RoleAccessGuard],data: {formFlag: ['LBINV']}},
{ path: 'wc-payment-details-list', component: WcPaymentDetailsListComponent , canActivate: [RoleAccessGuard],data: {formFlag: ['LBPYD']}},
{ path: 'wc-payment-details', component: WcPaymentDetailsComponent , canActivate: [RoleAccessGuard],data: {formFlag: ['LBPYD']}},
{ path: 'labour-work-payment-details-list', component: LabourWorkPaymentDeatilsListComponent , canActivate: [RoleAccessGuard],data: {formFlag: ['DWLPD']}},
{ path: 'labour-work-payment-details', component: LabourWorkPaymentDeatilsComponent , canActivate: [RoleAccessGuard],data: {formFlag: ['DWLPD']}},
{ path: 'weekly-payout-list', component: WeeklyPayoutListComponent , canActivate: [RoleAccessGuard],data: {formFlag: ['DWWPL']}},
{ path: 'weekly-payout', component: WeeklyPayoutComponent , canActivate: [RoleAccessGuard],data: {formFlag: ['DWWPL']}},
{ path: 'dw-payment-details-list', component: DwPaymentDetailsListComponent , canActivate: [RoleAccessGuard],data: {formFlag: ['DWPYD']}},
{ path: 'dw-payment-details', component: DwPaymentDetailsComponent , canActivate: [RoleAccessGuard],data: {formFlag: ['DWPYD']}},
];

// @NgModule({
//   imports: [RouterModule.forChild(routes)],
//   exports: [RouterModule]
// })
export const routing = [RouterModule.forChild(routes)]
//export class MasterRoutingModule { }
export const componentArray = [
  ProjectBudgetListComponent,
  ProjectBudgetComponent,
  RaiseIndentListComponent,
  RaiseIndentComponent,
  GeneratePoListComponent,
  GeneratePoComponent,
  GrnListComponent,
  GrnComponent,
  LabourContractListComponent,
  LabourContractComponent,
  PaymentDetailsComponent,
  PaymentDetailsListComponent,
  MaterialIssueSlipComponent,
  MaterialIssueSlipListComponent,
  MInvoiceDetailsListComponent,
  MInvoiceDetailsComponent,
  WcInvoiceDetailsListComponent,
  WcInvoiceDetailsComponent,
  WcPaymentDetailsListComponent,
  WcPaymentDetailsComponent,
  LabourWorkPaymentDeatilsListComponent,
  LabourWorkPaymentDeatilsComponent,
  WeeklyPayoutListComponent,
  WeeklyPayoutComponent,
  DwPaymentDetailsListComponent,
  DwPaymentDetailsComponent
];