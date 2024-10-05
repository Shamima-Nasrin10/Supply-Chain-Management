export class Ingredient{
    ingredientId?:Number
    recipeId?: any; // You might want to define a Recipe interface if needed
    name?: string;
    quantity?: number;
    materialId?: number;
    stock: any; // You might want to define a Stock interface if needed
}