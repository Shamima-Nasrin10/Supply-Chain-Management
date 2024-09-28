package com.shamima.SCMSystem.goods.restcontroller;

import com.shamima.SCMSystem.goods.entity.Product;
import com.shamima.SCMSystem.goods.service.ProductService;
import com.shamima.SCMSystem.util.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/product")
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping("/getByNameAndUnitPrice")
    public ApiResponse getByNameAndUnitPrice(@RequestParam String name, @RequestParam Double unitPrice) {
        return productService.getByNameAndUnitPrice(name, unitPrice);
    }

    @PostMapping("/save")
    public ApiResponse saveProduct(@RequestBody Product product) {
        return productService.saveProduct(product);
    }

    @PutMapping("/update")
    public ApiResponse updateProduct(@RequestBody Product product) {
        return productService.updateProduct(product);
    }

    @GetMapping("/list")
    public ApiResponse getAllProducts() {
        return productService.getAllProducts();
    }

    @GetMapping("/{id}")
    public ApiResponse findProductById(@PathVariable Long id) {
        return productService.findProductById(id);
    }

    @DeleteMapping("/delete/{id}")
    public ApiResponse deleteProductById(@PathVariable Long id) {
        return productService.deleteProductById(id);
    }

    @GetMapping("/getProductsByInventoryId")
    public ApiResponse getProductsByInventoryId(@RequestParam Long inventoryId) {
        return productService.getProductsByInventoryId(inventoryId);
    }
}
