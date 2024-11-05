package com.shamima.SCMSystem.production.service;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.MultiFormatWriter;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.shamima.SCMSystem.goods.entity.RawMaterial;
import com.shamima.SCMSystem.goods.entity.RawMaterialStock;
import com.shamima.SCMSystem.goods.repository.RMStockRepository;
import com.shamima.SCMSystem.goods.repository.RawMaterialRepository;
import com.shamima.SCMSystem.production.entity.ProductionProduct;
import com.shamima.SCMSystem.production.entity.RawMatUsage;
import com.shamima.SCMSystem.production.repository.ProdProductRepository;
import com.shamima.SCMSystem.products.entity.Warehouse;
import com.shamima.SCMSystem.products.repository.WarehouseRepository;
import com.shamima.SCMSystem.util.ApiResponse;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class ProdProductService {

    @Autowired
    private ProdProductRepository prodProductRepository;

    @Autowired
    private RawMaterialRepository rawMaterialRepository;

    @Autowired
    private RMStockRepository rmStockRepository;

    @Autowired
    private WarehouseRepository warehouseRepository;

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

    @Transactional
    public ApiResponse updateProductionStatus(Long productionProductId, ProductionProduct.Status status, Long warehouseId) {
        ApiResponse apiResponse = new ApiResponse(false);
        try {
            ProductionProduct productionProduct = prodProductRepository.findById(productionProductId)
                    .orElseThrow(() -> new RuntimeException("Production product not found"));

            productionProduct.setStatus(status);

            if (status == ProductionProduct.Status.COMPLETED) {
                productionProduct.setCompletionDate(new Date());
            } else if (status == ProductionProduct.Status.MOVED_TO_WAREHOUSE) {
                productionProduct.setMovedToWarehouseDate(new Date());

                // Manually assign the selected warehouse
                Warehouse selectedWarehouse = warehouseRepository.findById(warehouseId)
                        .orElseThrow(() -> new RuntimeException("Selected warehouse not found"));
                productionProduct.setWarehouse(selectedWarehouse);

                // Generate QR code
                String qrCodePath = generateQRCodeForProduct(productionProduct);
                // Optionally store qrCodePath in productionProduct
            }

            prodProductRepository.save(productionProduct);
            apiResponse.setSuccess(true);
            apiResponse.setMessage("Production product status updated successfully");
            apiResponse.setData("productionProduct", productionProduct);
        } catch (Exception e) {
            apiResponse.setMessage("Error updating production status: " + e.getMessage());
        }
        return apiResponse;
    }

    // QR Code generation method
    private String generateQRCodeForProduct(ProductionProduct productionProduct) throws Exception {
        // Prepare data for QR code
        String productName = productionProduct.getProduct().getName();
        Long batchNumber = productionProduct.getBatchNumber();
        Date completionDate = productionProduct.getCompletionDate(); // or manufacturing date if applicable

        // Format the completion date
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        String completionDateString = (completionDate != null) ? dateFormat.format(completionDate) : "N/A";

        // Create QR code content
        String qrCodeData = "Product Name: " + productName + "\n" +
                "Batch Number: " + batchNumber + "\n" +
                "Manufacturing Date: " + completionDateString;

        // Define file path for saving the QR code image
        String filePath = "src/main/resources/static/images" + productionProduct.getId() + "_qrcode.png";
        int qrCodeWidth = 300;
        int qrCodeHeight = 300;

        // Generate QR code
        BitMatrix matrix = new MultiFormatWriter().encode(
                qrCodeData, BarcodeFormat.QR_CODE, qrCodeWidth, qrCodeHeight);

        Path path = Paths.get(filePath);
        MatrixToImageWriter.writeToPath(matrix, "PNG", path);

        return filePath; // Return the file path for storing in the database if necessary
    }

}
