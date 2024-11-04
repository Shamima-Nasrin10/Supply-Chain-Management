package com.shamima.SCMSystem.production.service;

import com.shamima.SCMSystem.accounting.entity.Procurement;
import com.shamima.SCMSystem.goods.entity.RawMaterial;
import com.shamima.SCMSystem.goods.entity.RawMaterialStock;
import com.shamima.SCMSystem.goods.repository.RMStockRepository;
import com.shamima.SCMSystem.goods.repository.RawMaterialRepository;
import com.shamima.SCMSystem.production.entity.ProductionProduct;
import com.shamima.SCMSystem.production.entity.RawMatUsage;
import com.shamima.SCMSystem.production.repository.ProdProductRepository;
import com.shamima.SCMSystem.util.ApiResponse;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProdProductService {

    @Autowired
    private ProdProductRepository prodProductRepository;

    @Autowired
    private RawMaterialRepository rawMaterialRepository;

    @Autowired
    private RMStockRepository rmStockRepository;

    @Transactional
    public ApiResponse saveProdProduct(ProductionProduct productionProduct) {
        ApiResponse apiResponse = new ApiResponse(false);
        try {
            List<RawMatUsage> rawMatUsages = productionProduct.getRawMatUsages();
            for (RawMatUsage rawMatUsage : rawMatUsages) {
                RawMaterial rawMaterial = rawMatUsage.getRawMaterial();
                rawMaterial = rawMaterialRepository.findById(rawMaterial.getId()).orElse(null);
                if (rawMaterial == null) {
                    apiResponse.setMessage("Raw Material not found");
                    return apiResponse;
                }
                RawMaterialStock stock = rmStockRepository.findByRawMaterial(rawMaterial);
                if (stock == null) {
                    apiResponse.setMessage("Raw Material stock not found. Please order first.");
                    return apiResponse;
                }
                if (stock.getQuantity() < rawMatUsage.getQuantity()) {
                    apiResponse.setMessage("Insufficient stock. Please order more.");
                    return apiResponse;
                }

                stock.setQuantity(stock.getQuantity() - rawMatUsage.getQuantity());
                rmStockRepository.save(stock);
            }

            productionProduct = prodProductRepository.save(productionProduct);

            apiResponse.setSuccess(true);
            apiResponse.setMessage("Production saved successfully");
            apiResponse.setData("productionProduct", productionProduct);
        } catch (Exception e) {
            apiResponse.setMessage(e.getMessage());
        }
        return apiResponse;
    }

}
