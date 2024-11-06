import {NgModule} from '@angular/core';
import {BrowserModule, provideClientHydration} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, provideHttpClient, withFetch, withInterceptorsFromDi} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {RawMaterialCreateComponent} from './inventory/raw-materials/raw-material-create/raw-material-create.component';
import {RawMaterialListComponent} from './inventory/raw-materials/raw-material-list/raw-material-list.component';
import {SupplierListComponent} from './inventory/suppliers/supplier-list/supplier-list.component';
import {SupplierCreateComponent} from './inventory/suppliers/supplier-create/supplier-create.component';
import {HeaderComponent} from './template/header/header.component';
import {SidebarComponent} from './template/sidebar/sidebar.component';
import {FooterComponent} from './template/footer/footer.component';
import {NotificationComponent} from './notification/notification/notification.component';
import {OrderCreateComponent} from './order/order-create/order-create.component';
import {LoginComponent} from './access/login/login/login.component';
import {LogoutComponent} from './access/logout/logout/logout.component';
import {RegistrationComponent} from './access/registration/registration/registration.component';
import {UserProfileComponent} from './access/user-profile/user-profile.component';
import {UnauthorizedComponent} from './authentication/unauthorized/unauthorized.component';
import {OrderListComponent} from './order/order-list/order-list.component';
import {InvoiceComponent} from './invoice/invoice/invoice.component';
import {PdfGeneratorComponent} from './invoice/pdf-generator/pdf-generator.component';
import {AuthInterceptor} from './authentication/auth-interceptor';
import {
  RawMaterialCategoryCreateComponent
} from './inventory/raw-material-category/raw-material-category-create/raw-material-category-create.component';
import {
  RawMaterialCategoryListComponent
} from './inventory/raw-material-category/raw-material-category-list/raw-material-category-list.component';
import {WarehouseComponent} from './warehouse/warehouse/warehouse.component';
import {InventoryCreateComponent} from './inventory/inventory/inventory-create/inventory-create.component';
import {ProductComponent} from './product/product/product.component';
import {RetailerComponent, RetailerDialogComponent} from './product/retailer/retailer/retailer.component';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatCardModule} from "@angular/material/card";
import { SalesDetailsComponent } from './accounting/sales/sales-details/sales-details.component';
import { SalesCreateComponent } from './accounting/sales/sales-create/sales-create.component';
import { SalesUpdateComponent } from './accounting/sales/sales-update/sales-update.component';
import { SalesViewComponent } from './accounting/sales/sales-view/sales-view.component';
import { ProcurementComponent } from './accounting/procurement/procurement/procurement.component';
import { ProcurementListComponent } from './accounting/procurement/procurement-list/procurement-list.component';
import { RawMatUsageComponent } from './production/RawMatUsage/raw-mat-usage/raw-mat-usage.component';
import { ProdProductCreateComponent } from './production/prod-product/prod-product-create/prod-product-create.component';
import { ProdProductListComponent } from './production/prod-product/prod-product-list/prod-product-list.component';
import { WarehouseSelectDialogComponent } from './production/warehouse-select-dialog/warehouse-select-dialog.component'


@NgModule({
  declarations: [
    AppComponent,
    RawMaterialCreateComponent,
    RawMaterialListComponent,
    SupplierListComponent,
    SupplierCreateComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    NotificationComponent,
    OrderCreateComponent,
    LoginComponent,
    LogoutComponent,
    RegistrationComponent,
    UserProfileComponent,
    UnauthorizedComponent,
    OrderListComponent,
    InvoiceComponent,
    PdfGeneratorComponent,
    RawMaterialCategoryCreateComponent,
    RawMaterialCategoryListComponent,
    WarehouseComponent,
    InventoryCreateComponent,
    ProductComponent,
    RetailerComponent,
    RetailerDialogComponent,
    SalesDetailsComponent,
    SalesCreateComponent,
    SalesUpdateComponent,
    SalesViewComponent,
    ProcurementComponent,
    ProcurementListComponent,
    RawMatUsageComponent,
    ProdProductCreateComponent,
    ProdProductListComponent,
    WarehouseSelectDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    AppRoutingModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(
      withFetch(),
      withInterceptorsFromDi()
    ),
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
