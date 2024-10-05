import { Component, OnInit } from '@angular/core';
import { RawMaterial } from '../../model/rawmaterial.model';

import { RawmaterialService } from '../../service/rawmaterial.service';
import { error } from 'console';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-rawmaterial',
  templateUrl: './rawmaterial.component.html',
  styleUrls: ['./rawmaterial.component.css']
})
export class RawmaterialComponent implements OnInit{


  rawMaterials: RawMaterial[] = [];
  rawMaterialForm!: FormGroup; // Declare FormGroup
  editedRawMaterial: RawMaterial | null = null;

  constructor(
    private rawMaterialService: RawmaterialService,
    private fb: FormBuilder // Inject FormBuilder
  ) {}

  ngOnInit(): void {
    this.getAllRawMaterials();
    this.initForm(); // Initialize form
  }

  getAllRawMaterials() {
    this.rawMaterialService.getAllRawMaterials().subscribe(rawMaterials => {
      this.rawMaterials = rawMaterials;
    });
  }

  initForm() {
    this.rawMaterialForm = this.fb.group({
      materialName: ['', Validators.required], // Create FormControl for materialName
      materialType: ['', Validators.required] // Create FormControl for materialType
    });
  }

  addRawMaterial() {
    const rawMaterial: RawMaterial = this.rawMaterialForm.value;
    this.rawMaterialService.addRawMaterial(rawMaterial).subscribe({
      next: (response) => {
        console.log('Raw material added successfully: ', response);
        this.getAllRawMaterials();
        this.clearForm();
      },
      error: (error) => {
        console.error('Error adding raw material: ', error);
      }
    });
  }

  updateRawMaterial() {
    if (this.editedRawMaterial && this.editedRawMaterial.materialID !== undefined) {
      this.rawMaterialService.updateRawMaterial(this.editedRawMaterial.materialID, this.editedRawMaterial).subscribe({
        next: () => {
          console.log('Raw material updated successfully');
          this.getAllRawMaterials();
          this.clearForm();
        },
        error: (error) => {
          console.error('Error updating raw material: ', error);
        }
      });
    } else {
      console.error('Raw Material Id is not found');
    }
  }

  deleteRawMaterial(id: number | undefined): void {
    if (id !== undefined) {
      this.rawMaterialService.deleteRawMaterial(id).subscribe({
        next: () => {
          this.getAllRawMaterials();
        },
        error: (error) => {
          console.error(error);
        }
      });
    } else {
      console.error('Material ID is undefined');
    }
  }

  editRawMaterial(rawMaterial: RawMaterial): void {
    this.editedRawMaterial = { ...rawMaterial }; // Create a copy of the raw material object
    this.rawMaterialForm.patchValue({ // Patch form values with the edited raw material
      materialName: rawMaterial.materialName,
      materialType: rawMaterial.materialType
    });
  }

  clearForm(): void {
    this.editedRawMaterial = null;
    this.rawMaterialForm.reset(); // Reset the form
  }
}
