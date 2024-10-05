import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Inventory } from '../../model/inventory.model';
import { InventoryService } from '../../service/inventory.service';
import { RawMaterial } from '../../model/rawmaterial.model';
import { RawmaterialService } from '../../service/rawmaterial.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.css'
})
export class InventoryComponent implements OnInit{

  inventoryForm: FormGroup;
  inventoryList: Inventory[] = [];
  rawMaterials: RawMaterial[] = [];


  filteredInventoryList: Inventory[] = []; // Declare filtered inventory list

  dateRangeForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private inventoryService: InventoryService,  private rawMaterialService: RawmaterialService) { 

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

  saveInventory(): void {
    if (this.inventoryForm.valid) {
      // Get the selected raw material object
      const selectedRawMaterial: RawMaterial | undefined = this.rawMaterials.find(material => material.materialName === this.inventoryForm.value.rawMaterial);
      
      // Ensure the selected raw material is found
      if (selectedRawMaterial) {
        // Create a new Inventory object with selected raw material
        const inventoryData: Inventory = {
          rawMaterial: selectedRawMaterial,
          quantityInStock: this.inventoryForm.value.quantityInStock,
          unitPrice: this.inventoryForm.value.unitPrice,
          lastStockUpdateDate: this.inventoryForm.value.lastStockUpdateDate,
          procurement: this.inventoryForm.value.procurement
        };
  
        // Call the service to save inventory
        this.inventoryService.saveInventory(inventoryData).subscribe(response => {
          console.log(response); // Handle success or error
          // Reload inventory details after saving
          this.loadInventoryDetails();
          // Reset form
          this.inventoryForm.reset();
        });
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
