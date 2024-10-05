package com.sabit.nexchain.controller.allproducts;

import com.sabit.nexchain.model.product.Products;
import com.sabit.nexchain.repository.allproducts.ProductsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@Controller
public class ProductController {

    @Autowired
    private ProductsRepository productsRepository;

    @GetMapping("/add-products")
    public String addProductForm(Model model) {
        model.addAttribute("product", new Products());
        return "products/add-products";
    }



    @PostMapping("/add")
    public String addProduct(@ModelAttribute Products product, @RequestParam("image") MultipartFile image) {
        if (!image.isEmpty()) {
            try {
                // Save the image to the static/images directory
                String imageUrl = saveImageToStaticFolder(image, "images");
                product.setImageUrl(imageUrl);
            } catch (IOException e) {
                // Handle exception appropriately (e.g., log it, show user-friendly message)
                e.printStackTrace();
            }
        }

        // Save product to the database
        productsRepository.save(product);
        return "redirect:/products-list";
    }

    @GetMapping("/products-list")
    public String listProducts(Model model) {
        List<Products> products = productsRepository.findAll();
        model.addAttribute("products", products);
        return "products/products-list";
    }

    private String saveImageToStaticFolder(MultipartFile image, String subFolder) throws IOException {
        byte[] bytes = image.getBytes();
        String imageName = System.currentTimeMillis() + "_" + image.getOriginalFilename();
        Path path = Paths.get("src/main/resources/static/" + subFolder + "/" + imageName);
        Files.write(path, bytes);
        return "/" + subFolder + "/" + imageName;
    }
}
