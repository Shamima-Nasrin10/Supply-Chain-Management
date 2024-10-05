package com.sabit.nexchain.repository.production;

import com.sabit.nexchain.model.product.ProductionRecord;
import com.sabit.nexchain.model.production.ProductionProduct;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductionProductRepository extends JpaRepository<ProductionProduct,Long> {

    ProductionProduct findByProductName(String productName);
}
