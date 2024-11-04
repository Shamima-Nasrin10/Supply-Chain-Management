package com.shamima.SCMSystem.production.repository;

import com.shamima.SCMSystem.production.entity.ProductionProduct;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProdProductRepository extends JpaRepository<ProductionProduct, Long> {
}
