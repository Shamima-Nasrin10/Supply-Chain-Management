package com.sabit.nexchain.restcontroller;


import com.google.zxing.BarcodeFormat;
import com.google.zxing.EncodeHintType;
import com.google.zxing.WriterException;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;
import com.sabit.nexchain.model.logistic.ProductWareHouse;
import com.sabit.nexchain.repository.logistic.ProductWareHouseRepository;
import com.sabit.nexchain.service.logistic.ProductWareService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
//@RequestMapping("/warehouse/products")
public class ProductWareController {

    @Autowired
    private ProductWareService productWareService;

    @Autowired
    private ProductWareHouseRepository wareHouseRepository;



    @PostMapping("/products")
    public ProductWareHouse moveToWarehouse(@RequestBody ProductWareHouse product){
        return productWareService.saveProduct(product);
    }


    @PutMapping("/{productId}/approve")
    public ResponseEntity<?> approveProduct(@PathVariable Long productId) {
        productWareService.approveProduct(productId);
        return ResponseEntity.ok().build();
    }


    @GetMapping("/allWareDetails")
    public ResponseEntity<List<ProductWareHouse>> getAllDetails(){
        List<ProductWareHouse> wareSummary=wareHouseRepository.findAll();
        return new ResponseEntity<>(wareSummary, HttpStatus.OK);
    }


}
