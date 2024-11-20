import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RawMaterialCreateComponent } from './inventory/raw-materials/raw-material-create/raw-material-create.component';
import { RawMaterialListComponent } from './inventory/raw-materials/raw-material-list/raw-material-list.component';
import { SupplierCreateComponent } from './inventory/suppliers/supplier-create/supplier-create.component';
import { NotificationComponent } from './notification/notification/notification.component';
import { UserProfileComponent } from './access/user-profile/user-profile.component';
import { SupplierListComponent } from './inventory/suppliers/supplier-list/supplier-list.component';
import { RawMaterialCategoryCreateComponent } from './inventory/raw-material-category/raw-material-category-create/raw-material-category-create.component';
import { RawMaterialCategoryListComponent } from './inventory/raw-material-category/raw-material-category-list/raw-material-category-list.component';
import {WarehouseComponent} from "./warehouse/warehouse/warehouse.component";
import {InventoryCreateComponent} from "./inventory/inventory/inventory-create/inventory-create.component";
import {ProductComponent} from "./product/product/product.component";
import {SalesCreateComponent} from "./accounting/sales/sales-create/sales-create.component";
import {ProcurementComponent} from "./accounting/procurement/procurement/procurement.component";
import {ProcurementListComponent} from "./accounting/procurement/procurement-list/procurement-list.component";
import {ProdProductCreateComponent} from "./production/prod-product/prod-product-create/prod-product-create.component";
import {ProdProductListComponent} from "./production/prod-product/prod-product-list/prod-product-list.component";
import {RetailerListComponent} from "./product/retailer/retailer-list/retailer-list.component";
import {SalesViewComponent} from "./accounting/sales/sales-view/sales-view.component";

const routes: Routes = [
  // {
  //   path: '', redirectTo: 'login', pathMatch: 'full'
  // },
  // {
  //   path: "registration", component: RegistrationComponent
  // },
  // {
  //   path: 'unathorized', component: UnauthorizedComponent,
  // },
  // {
  //   path: "login", component: LoginComponent
  // },
  // {
  //   path: "logout", component: LogoutComponent
  // },
  {
    path:"warehouse", component: WarehouseComponent
  },
  {
    path:"inventory", component: InventoryCreateComponent
  },
  {
    path: "rawMaterial", component: RawMaterialCreateComponent
  },
  {
    path: "rawMaterial/:id", component: RawMaterialCreateComponent
  },
  {
    path: "rawMaterial-list", component: RawMaterialListComponent
  },
  {
    path: "rawMaterialCategory", component: RawMaterialCategoryCreateComponent
  },
  {
    path: "rawMaterialCategory/:id", component: RawMaterialCategoryCreateComponent
  },
  {
    path: "rawMaterialCategory-list", component: RawMaterialCategoryListComponent
  },
  {
    path: "supplier", component: SupplierCreateComponent
  },
  {
    path: "supplier/:id", component: SupplierCreateComponent
  },
  {
    path: "supplier-list", component: SupplierListComponent
  },
  {
    path:"procurements-create",component:ProcurementComponent
  },
  {
    path:"procurement-edit/:id",component:ProcurementComponent
  },
  {
    path:"procurements-list",component:ProcurementListComponent
  },
  {
    path: 'product',
    component: ProductComponent
  },
  {
    path:'prod-product-create', component: ProdProductCreateComponent
  },{
    path:'prod-product-list', component: ProdProductListComponent
  },
  {
    path:'sales-create', component: SalesCreateComponent
  },
  {
    path:"sales-edit/:id",component:SalesCreateComponent
  },
  {
    path:"sales-list",component:SalesViewComponent
  },
  {
    path:'retailer-list', component: RetailerListComponent
  },
  {
    path: "notification", component: NotificationComponent
  },

  {
    path: 'userprofile', component: UserProfileComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
