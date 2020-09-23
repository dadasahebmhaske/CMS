
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
  { path: 'project-budget-list', component: ProjectBudgetListComponent },
  { path: 'project-budget', component: ProjectBudgetComponent },
  { path: 'raise-indent-list', component: RaiseIndentListComponent },
  { path: 'raise-indent', component: RaiseIndentComponent },
  { path: 'generate-po-list', component: GeneratePoListComponent },
  { path: 'generate-po', component: GeneratePoComponent },
  { path: 'grn-list', component: GrnListComponent },
  { path: 'grn', component: GrnComponent },
  { path: 'labour-contract-list', component: LabourContractListComponent },
  { path: 'labour-contract', component: LabourContractComponent },
  { path: 'payment-details-list', component: PaymentDetailsListComponent },
  { path: 'payment-details', component: PaymentDetailsComponent },
  { path: 'material-issue-slip-list', component: MaterialIssueSlipListComponent },
  { path: 'material-issue-slip', component: MaterialIssueSlipComponent },
  { path: 'm-invoice-details-list', component: MInvoiceDetailsListComponent },
{ path: 'm-invoice-details', component: MInvoiceDetailsComponent },
{ path: 'wc-invoice-details-list', component: WcInvoiceDetailsListComponent },
{ path: 'wc-invoice-details', component: WcInvoiceDetailsComponent },
{ path: 'wc-payment-details-list', component: WcPaymentDetailsListComponent },
{ path: 'wc-payment-details', component: WcPaymentDetailsComponent },
{ path: 'labour-work-payment-details-list', component: LabourWorkPaymentDeatilsListComponent },
{ path: 'labour-work-payment-details', component: LabourWorkPaymentDeatilsComponent },
{ path: 'weekly-payout-list', component: WeeklyPayoutListComponent },
{ path: 'weekly-payout', component: WeeklyPayoutComponent },
{ path: 'dw-payment-details-list', component: DwPaymentDetailsListComponent },
{ path: 'dw-payment-details', component: DwPaymentDetailsComponent },
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