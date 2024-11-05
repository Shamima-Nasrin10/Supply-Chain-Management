import {Component, OnInit} from '@angular/core';
import {ProcurementModel, ProcurementStatus} from "../procurement.model";
import {ProcurementService} from "../procurement.service";
import {Router} from "@angular/router";
import {ApiResponse} from "../../../util/api.response";
import {SupplierModel} from "../../../inventory/suppliers/model/supplier.model";
import {RawMaterial} from "../../../inventory/raw-materials/model/raw-material.model";
import {RawMaterialService} from "../../../inventory/raw-materials/raw-material.service";
import {SupplierService} from "../../../inventory/suppliers/supplier.service";
import {NotifyUtil} from "../../../util/notify.util";

@Component({
  selector: 'app-procurement',
  templateUrl: './procurement.component.html',
  styleUrl: './procurement.component.css'
})
export class ProcurementComponent implements OnInit {

  procurement: ProcurementModel = new ProcurementModel();
  procurementStatusOptions = Object.values(ProcurementStatus);
  rawMaterials: RawMaterial[] = [];
  suppliers: SupplierModel[] = [];

  constructor(
    private procurementService: ProcurementService,
    private router: Router,
    private rawMaterialService: RawMaterialService,
    private supplierService: SupplierService,
  ) {}

  ngOnInit(): void {
    this.loadRawMaterials();
    this.loadSuppliers();
  }

  private loadRawMaterials(): void {
    this.rawMaterialService.getAllRawMaterials().subscribe({
      next: (apiResponse: ApiResponse) => {
        if (apiResponse && apiResponse.success) {
          this.rawMaterials = apiResponse.data['rawMaterials'];
        } else {
          NotifyUtil.error(apiResponse);
        }
      },
      error: (error) => {
        NotifyUtil.error(error);
      }
    });
  }

  private loadSuppliers(): void {
    this.supplierService.getAllRawMaterialSuppliers().subscribe({
      next: (apiResponse: ApiResponse) => {
        if (apiResponse && apiResponse.success) {
          this.suppliers = apiResponse.data['rawMaterialSupplier'];
        } else {
          NotifyUtil.error(apiResponse);
        }
      },
      error: (error) => {
        NotifyUtil.error(error);
      }
    });
  }

  updateTotalPrice(): void {
    this.procurement.totalPrice = this.procurement.quantity * this.procurement.unitPrice;
  }

  onSubmit(): void {
    this.updateTotalPrice();

    this.procurementService.saveProcurement(this.procurement).subscribe({
      next: (apiResponse: ApiResponse) => {
        if (apiResponse && apiResponse.success) {
          alert('Procurement created successfully!');
          this.router.navigate(['/procurements-list']);
        } else {
          NotifyUtil.error(apiResponse);
        }
      },
      error: (error) => {
        NotifyUtil.error(error);
      }
    });
  }
}
