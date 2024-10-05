import { Component, OnInit } from '@angular/core';
import { Procurement } from '../../model/procurement.model';
import { ProcurementService } from '../../service/procurement.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Supplier } from '../../model/supplier.model';
import { RawMaterial } from '../../model/rawmaterial.model';
import { SupplierService } from '../../service/supplier.service';
import { RawmaterialService } from '../../service/rawmaterial.service';

@Component({
  selector: 'app-procurement',
  templateUrl: './procurement.component.html',
  styleUrl: './procurement.component.css'
})
export class ProcurementComponent implements OnInit{

  procurements: Procurement[] = [];
  procurementForm: FormGroup;
  suppliers: Supplier[] = []; // Array to hold suppliers data
  rawMaterials: RawMaterial[] = []; // Array to hold raw materials data

  constructor(
    private procurementService: ProcurementService,
    private supplierService: SupplierService,
    private rawMaterialService: RawmaterialService,

    private fb: FormBuilder) {
    this.procurementForm = this.fb.group({
      supplier: ['', Validators.required],
      rawMaterial: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.min(1)]],
      unitPrice: ['', [Validators.required, Validators.min(0)]],
      totalPrice: [{ value: 0, disabled: true }] ,// Initialize total price field with 0 and disable it
      procurementDate: ['', Validators.required]
      
    });
  }

  ngOnInit(): void {
    this.getAllProcurements();
    this.getAllSuppliers(); // Fetch suppliers data
    this.getAllRawMaterials(); // Fetch raw materials data
    
  }

  getAllRawMaterials() {
    this.rawMaterialService.getAllRawMaterials().subscribe(rawMaterials => {
      this.rawMaterials = rawMaterials;
    });
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



  getAllProcurements(): void {
    this.procurementService.getAllProcurements().subscribe({
      next: (procurements) => {
        this.procurements = procurements;
      },
      error: (error) => {
        console.error('Error fetching procurements:', error);
      }
    });
  }



  addProcurement(): void {
    if (this.procurementForm.valid) {
      // Get the selected supplier and raw material objects
      const selectedSupplier: Supplier | undefined = this.suppliers.find(supplier => supplier.supplierName === this.procurementForm.value.supplier);
      const selectedRawMaterial: RawMaterial | undefined = this.rawMaterials.find(material => material.materialName === this.procurementForm.value.rawMaterial);
      
      // Ensure both supplier and raw material are selected
      if (selectedSupplier && selectedRawMaterial) {
        // Create a new Procurement object with selected supplier and raw material
        const newProcurement: Procurement = {
          supplier: selectedSupplier,
          rawMaterial: selectedRawMaterial,
          quantity: this.procurementForm.value.quantity,
          unitPrice: this.procurementForm.value.unitPrice,
          totalPrice: this.procurementForm.value.totalPrice,
          procurementDate: this.procurementForm.value.procurementDate
        };
        
        // Call the service to add procurement
        this.procurementService.addProcurement(newProcurement).subscribe({
          next: (procurement) => {
            console.log('Procurement added successfully:', procurement);
            this.getAllProcurements();
            this.procurementForm.reset();
          },
          error: (error) => {
            console.error('Error adding procurement:', error);
          }
        });
      } else {
        console.error('Selected supplier or raw material not found.');
      }
    }
  }

  deleteProcurement(id: number | undefined): void {
    if (id !== undefined) {
      this.procurementService.deleteProcurement(id).subscribe({
        next: () => {
          console.log('Procurement deleted successfully');
          this.getAllProcurements();
        },
        error: (error) => {
          console.error('Error deleting procurement:', error);
        }
      });
    } else {
      console.error('Procurement ID is undefined');
    }
  }
  

  // Method to calculate total price based on quantity and unit price
  calculateTotalPrice(): void {
    const quantity = this.procurementForm.get('quantity')?.value;
    const unitPrice = this.procurementForm.get('unitPrice')?.value;
    if (quantity !== null && unitPrice !== null) {
      const totalPrice = quantity * unitPrice;
      this.procurementForm.patchValue({ totalPrice }); // Update the value of total price field
    }
  }

}
