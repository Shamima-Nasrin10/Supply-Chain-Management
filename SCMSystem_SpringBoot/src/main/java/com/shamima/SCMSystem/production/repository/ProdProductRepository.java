package com.shamima.SCMSystem.production.repository;

import com.shamima.SCMSystem.production.entity.ProductionProduct;
import com.shamima.SCMSystem.products.entity.Warehouse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProdProductRepository extends JpaRepository<ProductionProduct, Long> {
    List<ProductionProduct> findProdProductByWarehouseId(long warehouse_id);

    @Query("SELECT p FROM ProductionProduct p WHERE p.status = 'MOVED_TO_WAREHOUSE'")
    List<ProductionProduct> findAllMovedToWarehouseProducts();
}
