package com.sabit.nexchain.repository.production;


import com.sabit.nexchain.model.production.Recipe;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RecipeRepository extends JpaRepository<Recipe,Long> {

   Recipe findByProductProductName(String productName);


//    @EntityGraph(attributePaths = {"ingredients", "ingredients.stock"})
//    Optional<Recipe> findByProductProductName(String productName);

}
