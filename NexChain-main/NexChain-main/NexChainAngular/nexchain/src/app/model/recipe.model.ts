import { Ingredient } from "./ingredient.model";

export interface Recipe{
    recipeId: number;
    product: any; // You might want to define a Product interface if needed
    ingredients: Ingredient[];
}