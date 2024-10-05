package com.sabit.nexchain.controller.productioncontroller;


import com.sabit.nexchain.model.RawMaterial;
import com.sabit.nexchain.model.production.Ingredient;
import com.sabit.nexchain.model.production.ProductionProduct;
import com.sabit.nexchain.model.production.Recipe;
import com.sabit.nexchain.service.production.RecipeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/recipes")
public class RecipeController {


    @Autowired
    private RecipeService recipeService;

    @GetMapping("/")
    public List<Recipe> getAllRecipes() {
        return recipeService.getAllRecipes();
    }

    @PostMapping("/")
    public Recipe createRecipe(@RequestBody Recipe recipe) {
        return recipeService.createRecipe(recipe);
    }

    @GetMapping("/{id}")
    public Recipe getRecipeById(@PathVariable Long id) {
        return recipeService.getRecipeById(id);
    }

    @DeleteMapping("/{id}")
    public void deleteRecipe(@PathVariable Long id) {
        recipeService.deleteRecipe(id);
    }


    @GetMapping("/ingredients")
    public List<Ingredient> getIngredientsByProductName(@RequestParam String productName) {
        return recipeService.getIngredientsByProductName(productName);
    }


    @GetMapping("/names")
    public List<RawMaterial> getRawMaterialNames() {
        return recipeService.getRawMaterialNames();
    }

    @GetMapping("/productionproduct")
    public List<ProductionProduct>getAllProductsProduction(){
        return recipeService.getProductionProductName();
    }
}
