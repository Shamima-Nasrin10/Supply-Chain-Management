package com.shamima.SCMSystem.production.service;

import com.shamima.SCMSystem.goods.entity.Inventory;
import com.shamima.SCMSystem.production.entity.Product;
import com.shamima.SCMSystem.goods.entity.RawMaterial;
import com.shamima.SCMSystem.goods.repository.InventoryRepository;
import com.shamima.SCMSystem.production.entity.Warehouse;
import com.shamima.SCMSystem.production.repository.ProductRepository;
import com.shamima.SCMSystem.production.repository.WarehouseRepository;
import com.shamima.SCMSystem.util.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private WarehouseRepository warehouseRepository;

    @Transactional
    public ApiResponse getByNameAndUnitPrice(String name, Double unitPrice) {
        ApiResponse apiResponse = new ApiResponse(false);
        try {
            Product existingProduct = productRepository.findByNameAndUnitPrice(name, unitPrice)
                    .orElse(null);

            apiResponse.setData("product", existingProduct);
            apiResponse.setSuccess(true);
        } catch (Exception e) {
            apiResponse.setMessage("Error while saving product: " + e.getMessage());
        }
        return apiResponse;
    }

    @Transactional
    public ApiResponse saveProduct(Product product) {
        ApiResponse apiResponse = new ApiResponse(false);
        try {
            // Check if the warehouse exists for this product
            Warehouse warehouse = warehouseRepository.findById(product.getWarehouse().getId())
                    .orElse(null);
            if (warehouse == null) {
                apiResponse.setMessage("Warehouse not found");
                return apiResponse;
            }

            // Check if a product with the same name and unit price exists
            Optional<Product> existingProduct = productRepository.findByNameAndUnitPrice(product.getName(), product.getUnitPrice());

            if (existingProduct.isPresent()) {
                // Update stock if the product already exists
                Product existing = existingProduct.get();
                existing.setStock(existing.getStock() + product.getStock());
                productRepository.save(existing);
                apiResponse.setMessage("Stock updated successfully.");
            } else {
                // Create a new product
                product.setWarehouse(warehouse); // Set the warehouse
                productRepository.save(product);
                apiResponse.setMessage("Product saved successfully.");
            }

            apiResponse.setSuccess(true);
        } catch (Exception e) {
            apiResponse.setMessage("Error while saving product: " + e.getMessage());
        }
        return apiResponse;
    }


    @Transactional
    public ApiResponse updateProduct(Product updatedProduct) {
        ApiResponse apiResponse = new ApiResponse(false);
        try {
            Optional<Product> existingProduct = productRepository.findById(updatedProduct.getId());

            if (existingProduct.isEmpty()) {
                apiResponse.setMessage("Product not found");
                return apiResponse;
            }

            // Check if the warehouse exists
            Warehouse warehouse = warehouseRepository.findById(updatedProduct.getWarehouse().getId())
                    .orElse(null);
            if (warehouse == null) {
                apiResponse.setMessage("Warehouse not found");
                return apiResponse;
            }

            // Update product details
            Product product = existingProduct.get();
            product.setName(updatedProduct.getName());
            product.setUnitPrice(updatedProduct.getUnitPrice());
            product.setStock(updatedProduct.getStock());
            product.setQuantity(updatedProduct.getQuantity());
            product.setBatch(updatedProduct.getBatch());
            product.setUnit(updatedProduct.getUnit());
            product.setWarehouse(warehouse);

            productRepository.save(product);

            apiResponse.setSuccess(true);
            apiResponse.setMessage("Product updated successfully.");
        } catch (Exception e) {
            apiResponse.setMessage("Error while updating product: " + e.getMessage());
        }
        return apiResponse;
    }


    public ApiResponse getAllProducts() {
        ApiResponse apiResponse = new ApiResponse(false);
        try {
            List<Product> products = productRepository.findAll();
            apiResponse.setSuccess(true);
            apiResponse.setData("products", products);
        } catch (Exception e) {
            apiResponse.setMessage("Error fetching products: " + e.getMessage());
        }
        return apiResponse;
    }


    public ApiResponse findProductById(long id) {
        ApiResponse apiResponse = new ApiResponse(false);
        try {
            Product product = productRepository.findById(id).orElse(null);
            if (product == null) {
                apiResponse.setMessage("Product not found");
                return apiResponse;
            }
            apiResponse.setSuccess(true);
            apiResponse.setData("product", product);
        } catch (Exception e) {
            apiResponse.setMessage("Error fetching product: " + e.getMessage());
        }
        return apiResponse;
    }


    @Transactional
    public ApiResponse deleteProductById(long id) {
        ApiResponse apiResponse = new ApiResponse(false);
        try {
            Product product = productRepository.findById(id).orElse(null);
            if (product == null) {
                apiResponse.setMessage("Product not found");
                return apiResponse;
            }
            productRepository.deleteById(id);
            apiResponse.setSuccess(true);
            apiResponse.setMessage("Product deleted successfully.");
        } catch (Exception e) {
            apiResponse.setMessage("Error deleting product: " + e.getMessage());
        }
        return apiResponse;
    }

}
