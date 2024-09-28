package com.shamima.SCMSystem.goods.repository;

import com.shamima.SCMSystem.goods.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    Optional<List<Product>> findAllByInventoryId(Long inventoryId);

    Optional<Product> findByNameAndUnitPrice(String name, Double price);
}
