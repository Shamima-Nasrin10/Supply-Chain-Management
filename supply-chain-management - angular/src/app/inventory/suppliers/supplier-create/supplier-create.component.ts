import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SupplierModel } from '../model/supplier.model';
import { SupplierService } from '../supplier.service';
import { ApiResponse } from '../../../util/api.response';
import { NotifyUtil } from '../../../util/notify.util';

@Component({
  selector: 'app-supplier-create',
  templateUrl: './supplier-create.component.html',
  styleUrls: ['./supplier-create.component.css']
})
export class SupplierCreateComponent implements OnInit {

  supplier: SupplierModel = new SupplierModel();
  supplierId?: number;

  constructor(
    private supplierService: SupplierService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.supplierId = this.route.snapshot.params['id'];

    if (this.supplierId) {
      this.loadSupplier(this.supplierId);
    }

  }

  private loadSupplier(id: number): void {
    this.supplierService.getRawMaterialSupplierById(id).subscribe({
      next: (response: ApiResponse) => {
        if (response && response.success) {
          this.supplier = response.data['rawMaterialSupplier'];
        } else {
          NotifyUtil.error(response);
        }
      },
      error: (error) => {
        NotifyUtil.error(error);
      }
    });
  }

  onSubmit() {
    const supplierObservable = this.supplierId
      ? this.supplierService.updateRawMaterialSupplier(this.supplier)
      : this.supplierService.saveRawMaterialSupplier(this.supplier);

      supplierObservable.subscribe({
      next: (response: ApiResponse) => {
        if (response && response.success) {
          this.supplier = new SupplierModel();
          NotifyUtil.success(response);
          this.router.navigate(['/supplier-list']);
        } else {
          NotifyUtil.error(response);
        }
      },
      error: error => {
        NotifyUtil.error(error);
      }
    });
  }

}

