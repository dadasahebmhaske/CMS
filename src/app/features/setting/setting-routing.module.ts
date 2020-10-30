import { ModuleWithProviders } from "@angular/core"
import { Routes, RouterModule } from '@angular/router';
import { RoleAccessGuard } from '@app/core/guards/roleAccess.guard';
import { MainmenuListComponent } from "./mainmenu-list/mainmenu-list.component";
import { MainmenuComponent } from "./mainmenu/mainmenu.component";
import { MainmenuL2ListComponent } from "./mainmenu-l2-list/mainmenu-l2-list.component";
import { MainmenuL2Component } from "./mainmenu-l2/mainmenu-l2.component";
import { SubmenuL3ListComponent } from "./submenu-l3-list/submenu-l3-list.component";
import { SubmenuL3Component } from "./submenu-l3/submenu-l3.component";
import { MenuAllocationComponent } from "./menu-allocation/menu-allocation.component";
import { MenuAllocationDetailsComponent } from "./menu-allocation-details/menu-allocation-details.component";

const routes: Routes = [
  { path: 'mainmenu-list', component: MainmenuListComponent },
  { path: 'mainmenu', component: MainmenuComponent },
  { path: 'submenuL2-list', component: MainmenuL2ListComponent },
  { path: 'submenuL2', component: MainmenuL2Component },
  { path: 'submenuL3-list', component: SubmenuL3ListComponent },
  { path: 'submenuL3', component: SubmenuL3Component },
  { path: 'menu-allocation', component: MenuAllocationComponent },
  { path: 'menu-allocation-details', component: MenuAllocationDetailsComponent },
 
];

export const routing = [RouterModule.forChild(routes)]
//export class MasterRoutingModule { }
export const componentArray = [
  MainmenuListComponent,
  MainmenuComponent,
  MainmenuL2ListComponent,
  MainmenuL2Component,
  SubmenuL3ListComponent,
  SubmenuL3Component,
  MenuAllocationComponent,
  MenuAllocationDetailsComponent
];
