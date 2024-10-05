import { Component, OnInit } from '@angular/core';
import { Supplier } from '../../model/supplier.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SupplierService } from '../../service/supplier.service';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrl: './supplier.component.css'
})
export class SupplierComponent implements OnInit{

  suppliers: Supplier[] = [];
  supplierForm: FormGroup;

  constructor(private supplierService: SupplierService, private fb: FormBuilder) {
    this.supplierForm = this.fb.group({
      supplierName: ['', Validators.required],
      supplierCompanyName: ['', Validators.required],
      supplierContactInfo: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getAllSuppliers();
  }

  getAllSuppliers(): void {
    this.supplierService.getAllSuppliers().subscribe({
      next: (suppliers) => {
        this.suppliers = suppliers;
      },
      error: (error) => {
        console.error('Error fetching suppliers:', error);
      }
    });
  }

  addSupplier(): void {
    if (this.supplierForm.valid) {
      const newSupplier: Supplier = this.supplierForm.value;
      this.supplierService.addSupplier(newSupplier).subscribe({
        next: (supplier) => {
          console.log('Supplier added successfully:', supplier);
          this.getAllSuppliers();
          this.supplierForm.reset();
        },
        error: (error) => {
          console.error('Error adding supplier:', error);
        }
      });
    }
  }

  deleteSupplier(id: number | undefined): void {
    if (id !== undefined) {
      this.supplierService.deleteSupplier(id).subscribe({
        next: () => {
          console.log('Supplier deleted successfully');
          this.getAllSuppliers();
        },
        error: (error) => {
          console.error('Error deleting supplier:', error);
        }
      });
    } else {
      console.error('Supplier ID is undefined');
    }
  }
}