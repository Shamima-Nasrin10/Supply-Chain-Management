package com.sabit.nexchain.service.production;


import com.sabit.nexchain.model.production.ProductionProduct;
import com.sabit.nexchain.repository.production.ProductionProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductionProductService {
    @Autowired
    private ProductionProductRepository productRepository;

    public List<ProductionProduct> getAllProducts() {
        return productRepository.findAll();
    }

    public ProductionProduct createProduct(ProductionProduct product) {
        return productRepository.save(product);
    }

    public ProductionProduct getProductById(Long id) {
        return productRepository.findById(id).orElse(null);
    }

    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }
}