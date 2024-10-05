package com.sabit.nexchain.repository.allproducts;

import com.sabit.nexchain.model.product.Products;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductsRepository extends JpaRepository<Products , Long> {


}
