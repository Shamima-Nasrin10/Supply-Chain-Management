package com.sabit.nexchain.repository.production;


import com.sabit.nexchain.model.Stock;
import com.sabit.nexchain.model.production.Ingredient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IngredientRepository extends JpaRepository<Ingredient,Long> {
    Ingredient findByStock(Stock stock);
}
