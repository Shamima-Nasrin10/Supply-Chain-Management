import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductionProductComponent } from './components/production-product/production-product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { RecipeComponent } from './components/recipe/recipe.component';
import { ProductionQuantityComponent } from './components/production-quantity/production-quantity.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { BodyComponent } from './components/body/body.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SublevelMenuComponent } from './components/side-bar/sublevel-menu.component';
import { RawmaterialComponent } from './components/rawmaterial/rawmaterial.component';
import { SupplierComponent } from './components/supplier/supplier.component';
import { ProcurementComponent } from './components/procurement/procurement.component';
import { PaymentComponent } from './components/payment/payment.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductWarehouseComponent } from './components/product-warehouse/product-warehouse.component';
import { InventoryComponent } from './components/inventory/inventory.component';
import { StockComponent } from './components/stock/stock.component';

import { QRCodeModule } from 'angularx-qrcode';
import { QrCodeComponent } from './components/qr-code/qr-code.component';
import { WarehouseStatusComponent } from './components/warehouse-status/warehouse-status.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductionProductComponent,
    RecipeComponent,
    ProductionQuantityComponent,
    SideBarComponent,
    BodyComponent,
    DashboardComponent,
    SublevelMenuComponent,
    RawmaterialComponent,
    SupplierComponent,
    ProcurementComponent,
    PaymentComponent,
    ProductsComponent,
    ProductWarehouseComponent,
    
    InventoryComponent,
    StockComponent,
    QrCodeComponent,
    WarehouseStatusComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    QRCodeModule
    
    
    
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withFetch())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
