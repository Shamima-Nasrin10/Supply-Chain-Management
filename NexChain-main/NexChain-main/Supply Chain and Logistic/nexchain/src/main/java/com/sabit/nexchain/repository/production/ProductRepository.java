package com.sabit.nexchain.repository.production;

import com.sabit.nexchain.model.product.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product,Long> {
}
