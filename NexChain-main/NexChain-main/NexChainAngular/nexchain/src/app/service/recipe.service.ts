import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Recipe } from '../model/recipe.model';
import { Ingredient } from '../model/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private apiUrl = 'http://localhost:8084/recipes';
  // private apiUrls = 'http://localhost:8084/products';

  constructor(private http: HttpClient) { }



  getAllRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(`${this.apiUrl}/`);
  }

  createRecipe(recipe: Recipe): Observable<Recipe> {
    return this.http.post<Recipe>(`${this.apiUrl}/`, recipe);
  }

  getRecipeById(id: number): Observable<Recipe> {
    return this.http.get<Recipe>(`${this.apiUrl}/${id}`);
  }

  deleteRecipe(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getIngredientsByProductName(productName: string): Observable<Ingredient[]> {
    return this.http.get<Ingredient[]>(`${this.apiUrl}/ingredients?productName=${productName}`);
  }

  getRawMaterialNames():Observable<any[]>{
    return this.http.get<any[]>(`${this.apiUrl}/names`)
  }

  getAllProductsProduction():Observable<any[]>{
    return this.http.get<any[]>(`${this.apiUrl}/productionproduct`)
  }

}
