import { Component, OnInit } from '@angular/core';
import { ProductionRecords } from '../../model/production-records.model';
import { ProductionQuantityService } from '../../service/production-quantity.service';
import { ProductionProductService } from '../../service/production-product.service';
import { ProductionProduct } from '../../model/production-product.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-production-quantity',
  templateUrl: './production-quantity.component.html',
  styleUrl: './production-quantity.component.css'
})
export class ProductionQuantityComponent implements OnInit{

  productionData: ProductionRecords = new ProductionRecords(); // Instance of ProductionRecords
  products: ProductionProduct[] = []; // Array to store the list of products
  productionForm: FormGroup; // Define productionForm as a FormGroup

  constructor(
    private productionService: ProductionQuantityService,
    private formBuilder: FormBuilder // Inject FormBuilder
  ) {
    // Initialize productionForm with form controls
    this.productionForm = this.formBuilder.group({
      productName: ['', Validators.required],
      productionQuantity: ['', Validators.required],
      productionDate: ['', Validators.required],
      qualityControlInfo: [''],
      batchNumber: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.fetchProducts(); // Fetch products when the component initializes
  }

  fetchProducts() {
    this.productionService.getProducts()
      .subscribe(
        (data: ProductionProduct[]) => {
          this.products = data;
        },
        error => {
          console.error('Error fetching products', error);
          // Handle error
        }
      );
  }

  saveProductionData() {
    if (this.productionForm.valid) { // Check if form is valid before saving data
      // Assign form values to productionData object
      this.productionData.product = this.products.find(product => product.productName === this.productionForm.value.productName);
      this.productionData.productionQuantity = this.productionForm.value.productionQuantity;
      this.productionData.productionDate = this.productionForm.value.productionDate;
      this.productionData.qualityControlInfo = this.productionForm.value.qualityControlInfo;
      this.productionData.batchNumber = this.productionForm.value.batchNumber;

      this.productionService.produceProduct(this.productionData)
        .subscribe(
          response => {
            console.log('Production data saved successfully', response);
            // Reset the form after successful submission
            this.productionForm.reset();
          },
          error => {
            console.error('Error saving production data', error);
            this.productionForm.reset();
            // Handle error
          }
        );
    }
  }
}
