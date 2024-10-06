import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Inventory} from '../../model/inventory.model';
import {InventoryService} from '../../service/inventory.service';
import {RawMaterial} from '../../model/rawmaterial.model';
import {RawmaterialService} from '../../service/rawmaterial.service';
import {Procurement} from "../../model/procurement.model";
import {ProcurementService} from "../../service/procurement.service";

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.css'
})
export class InventoryComponent implements OnInit {

  inventoryForm: FormGroup;
  inventoryList: Inventory[] = [];
  rawMaterials: RawMaterial[] = [];
  procurements: Procurement[] = [];


  filteredInventoryList: Inventory[] = []; // Declare filtered inventory list

  dateRangeForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private inventoryService: InventoryService,
    private rawMaterialService: RawmaterialService,
    private procurementService: ProcurementService) {

    this.inventoryForm = this.formBuilder.group({
      rawMaterial: ['', Validators.required],
      quantityInStock: ['', Validators.required],
      unitPrice: ['', Validators.required],
      lastStockUpdateDate: ['', Validators.required],
      procurement: ['', Validators.required]
    });

  }

  ngOnInit(): void {

    this.loadInventoryDetails();
    this.getAllRawMaterials();
    this.getAllProcurements();

    this.dateRangeForm = this.formBuilder.group({
      startDate: [''],
      endDate: ['']
    });

  }


  getAllRawMaterials() {
    this.rawMaterialService.getAllRawMaterials().subscribe(rawMaterials => {
      this.rawMaterials = rawMaterials;
    });
  }

  loadInventoryDetails() {
    this.inventoryService.getInventoryDetails().subscribe(data => {
      this.inventoryList = data;
      // Initialize filtered list with all items by default
      this.filteredInventoryList = [...this.inventoryList];

    });
  }

  getAllProcurements() {
    this.procurementService.getAllProcurements().subscribe(procurements => {
      this.procurements = procurements;
    });
  }

  saveInventory(): void {
    if (this.inventoryForm.valid) {
      const selectedRawMaterial: RawMaterial | undefined = this.rawMaterials.find(
        material => material.materialName === this.inventoryForm.value.rawMaterial
      );

      if (selectedRawMaterial) {
        const selectedProcurement: Procurement | undefined = this.procurements.find(proc => proc.id === this.inventoryForm.value.procurement);

        if (selectedProcurement) {
          // Create a new Inventory object with selected raw material and procurement
          const inventoryData: Inventory = {
            rawMaterial: selectedRawMaterial,
            quantityInStock: this.inventoryForm.value.quantityInStock,
            unitPrice: this.inventoryForm.value.unitPrice,
            lastStockUpdateDate: this.inventoryForm.value.lastStockUpdateDate,
            procurement: selectedProcurement
          };

          this.inventoryService.saveInventory(inventoryData).subscribe(response => {
            console.log(response);
            this.loadInventoryDetails();  // Reload inventory list
            this.inventoryForm.reset();  // Reset form after save
          });
        } else {
          console.error('Selected procurement not found.');
        }
      } else {
        console.error('Selected raw material not found.');
      }
    }
  }


  // Filter inventory list based on the selected date range
  filterInventoryList() {
    const startDate = this.dateRangeForm.get('startDate')?.value;
    const endDate = this.dateRangeForm.get('endDate')?.value;

    if (startDate && endDate) {
      this.filteredInventoryList = this.inventoryList.filter(
        inventory =>
          inventory.lastStockUpdateDate &&
          inventory.lastStockUpdateDate >= startDate &&
          inventory.lastStockUpdateDate <= endDate
      );
    } else {
      // If either start or end date is not selected, show the entire inventory list
      this.filteredInventoryList = [...this.inventoryList];
    }
  }

  // Handle form submission
  onSubmit() {
    this.filterInventoryList(); // Apply filtering based on date range
  }
}
