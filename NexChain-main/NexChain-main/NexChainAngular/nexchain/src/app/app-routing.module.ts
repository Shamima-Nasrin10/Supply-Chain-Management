import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductionProductComponent } from './components/production-product/production-product.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProductionQuantityComponent } from './components/production-quantity/production-quantity.component';
import { RecipeComponent } from './components/recipe/recipe.component';
import { RawMaterial } from './model/rawmaterial.model';
import { ProcurementComponent } from './components/procurement/procurement.component';
import { RawmaterialComponent } from './components/rawmaterial/rawmaterial.component';
import { SupplierComponent } from './components/supplier/supplier.component';
import { PaymentComponent } from './components/payment/payment.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductWarehouseComponent } from './components/product-warehouse/product-warehouse.component';
// import { ScanWarehouseComponent } from './components/scan-warehouse/scan-warehouse.component';
import { InventoryComponent } from './components/inventory/inventory.component';
import { StockComponent } from './components/stock/stock.component';
import { QrCodeComponent } from './components/qr-code/qr-code.component';
import { WarehouseStatusComponent } from './components/warehouse-status/warehouse-status.component';

const routes: Routes = [
  { path: 'products', component: ProductionProductComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'productionquantity', component: ProductionQuantityComponent },
  { path: 'recipe', component: RecipeComponent },
  { path: 'rawmaterial', component: RawmaterialComponent },
  { path: 'procurement', component: ProcurementComponent },
  { path: 'supplier', component: SupplierComponent },
  { path: 'payment', component: PaymentComponent },
  { path: 'allproducts', component: ProductsComponent },
  { path: 'productwarehouse', component: ProductWarehouseComponent },
  // {path: 'scanwarehouse', component: ScanWarehouseComponent },
  {path: 'inventory', component: InventoryComponent },
  {path: 'stock', component: StockComponent },
  {path: 'qr-code', component: QrCodeComponent },
  {path: 'ware-status', component: WarehouseStatusComponent }

  



  // { path: '', redirectTo: '/products', pathMatch: 'full' }, // Default route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
