import { Component } from '@angular/core';
import { SupplierModel } from '../model/supplier.model';
import { SupplierService } from '../supplier.service';
import { ApiResponse } from '../../../util/api.response';
import { NotifyUtil } from '../../../util/notify.util';

@Component({
  selector: 'app-supplier-list',
  templateUrl: './supplier-list.component.html',
  styleUrl: './supplier-list.component.css'
})
export class SupplierListComponent {

  suppliers: SupplierModel[] = []; 

  constructor(private supplierService: SupplierService) { }

  ngOnInit(): void {
    this.loadSuppliers();
  }

 
  private loadSuppliers(): void {
    this.supplierService.getAllRawMaterialSuppliers().subscribe({
      next: (response: ApiResponse) => {
        if (response && response.success) {
          this.suppliers = response.data['rawMaterialSuppliers'];
        } else {
          NotifyUtil.error(response);
        }
      },
      error: (error) => {
        NotifyUtil.error(error);
      }
    });
  }

 
  deleteSupplier(id: number): void {
    if (confirm('Are you sure you want to delete this supplier?')) {
      this.supplierService.deleteRawMaterialSupplier(id).subscribe({
        next: (response: ApiResponse) => {
          if (response && response.success) {
            NotifyUtil.success(response);
          } else {
            NotifyUtil.error(response);
          }
          this.loadSuppliers(); 
        },
        error: (error) => {
          NotifyUtil.error(error);
        }
      });
    }
  }

}
