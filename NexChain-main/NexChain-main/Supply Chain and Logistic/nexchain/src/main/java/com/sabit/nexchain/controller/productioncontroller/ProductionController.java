package com.sabit.nexchain.controller.productioncontroller;


import com.sabit.nexchain.model.product.Product;
import com.sabit.nexchain.model.product.ProductionRecord;
import com.sabit.nexchain.model.production.ProductionProduct;
import com.sabit.nexchain.repository.production.ProductRepository;
import com.sabit.nexchain.repository.production.ProductionProductRepository;
import com.sabit.nexchain.service.InventoryService;
import com.sabit.nexchain.service.production.ProductionProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/products")
@CrossOrigin(origins = "http://localhost:4200") // Allow requests from http://localhost:4200


public class ProductionController {

    @Autowired
    private ProductionProductService productService;

    @GetMapping("/")
    public List<ProductionProduct> getAllProducts() {
        return productService.getAllProducts();
    }

    @PostMapping("/")
    public ProductionProduct createProduct(@RequestBody ProductionProduct product) {
        return productService.createProduct(product);
    }

    @GetMapping("/{id}")
    public ProductionProduct getProductById(@PathVariable Long id) {
        return productService.getProductById(id);
    }

    @DeleteMapping("/{id}")
    public void deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
    }
}
