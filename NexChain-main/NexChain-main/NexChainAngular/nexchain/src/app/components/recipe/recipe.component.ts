import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RecipeService } from '../../service/recipe.service';
import { Router } from '@angular/router';
import { ProductionProduct } from '../../model/production-product.model';
import { RawMaterial } from '../../model/rawmaterial.model';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css'] // Corrected property name
})
export class RecipeComponent implements OnInit{


  recipeForm!: FormGroup;
  ingredientsArray!: FormArray;
  rawMaterials: RawMaterial[] = [];
  productionProducts: ProductionProduct[]=[];

  constructor(
    private formBuilder: FormBuilder,
    private recipeService: RecipeService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.ingredientsArray = this.recipeForm.get('ingredients') as FormArray;
    this.loadProductionProductName();
    this.loadRawMaterials();
    

  }

  initForm(): void {
    this.recipeForm = this.formBuilder.group({
      product: this.formBuilder.group({
        productName: ['', Validators.required]
      }),
      ingredients: this.formBuilder.array([
        this.createIngredientFormGroup(),
      ])
    });
  }

  createIngredientFormGroup(): FormGroup {
    return this.formBuilder.group({
      name: ['', Validators.required],
      quantity: ['', Validators.required]
    });
  }

  addIngredient(): void {
    const ingredientsArray = this.recipeForm.get('ingredients') as FormArray;
    ingredientsArray.push(this.createIngredientFormGroup());
  }
  
  removeIngredient(index: number): void {
    const ingredientsArray = this.recipeForm.get('ingredients') as FormArray;
    ingredientsArray.removeAt(index);
  }

  onSubmit(): void {
    if (this.recipeForm.valid) {
      this.recipeService.createRecipe(this.recipeForm.value).subscribe(
        (response) => {
          console.log('Recipe created successfully:', response);
          // Optionally, navigate to another page after successful creation
          this.recipeForm.reset();
          this.router.navigate(['/recipe']);
        },
        (error) => {
          console.error('Error creating recipe:', error);
          // Handle error
        }
      );
    } else {
      console.error('Form is invalid. Please fill in all required fields.');
      // Handle form validation errors
    }
  }


  private loadRawMaterials(): void {
    this.recipeService.getRawMaterialNames().subscribe(
      (rawMaterials) => {
        this.rawMaterials = rawMaterials;
        console.log('Raw materials:', this.rawMaterials); // Log raw materials to console
      },
      (error) => {
        console.error('Error loading raw materials:', error);
      }
    );
  }


  private loadProductionProductName(): void {
    this.recipeService.getAllProductsProduction().subscribe(
      (productionProducts) => {
        this.productionProducts = productionProducts;
        console.log('Production ProductName:', this.productionProducts); 
      },
      (error) => {
        console.error('Error loading ProductionProcuct:', error);
      }
    );
  }
  
}
