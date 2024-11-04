package com.shamima.SCMSystem.products.repository;

import com.shamima.SCMSystem.products.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    Optional<Product> findByNameAndUnitPrice(String name, Double price);
}
