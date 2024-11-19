package com.shamima.SCMSystem.accounting.service;

import com.shamima.SCMSystem.accounting.entity.Sales;
import com.shamima.SCMSystem.accounting.repository.SalesRepository;
import com.shamima.SCMSystem.production.entity.ProductionProduct;
import com.shamima.SCMSystem.production.repository.ProdProductRepository;
import com.shamima.SCMSystem.products.entity.Warehouse;
import com.shamima.SCMSystem.products.repository.WarehouseRepository;
import com.shamima.SCMSystem.util.ApiResponse;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SalesService {

    @Autowired
    private SalesRepository salesRepository;

    @Autowired
    private ProdProductRepository prodProductRepository;

    @Autowired
    private WarehouseRepository warehouseRepository;

    @Transactional
    public ApiResponse approveSales(long salesId) {
        ApiResponse apiResponse = new ApiResponse(false);

        try {
            // Fetch the sales record
            Sales sales = salesRepository.findById(salesId)
                    .orElseThrow(() -> new RuntimeException("Sales record not found"));

            // Ensure the status is not already approved
            if (sales.getStatus() == Sales.Status.APPROVED) {
                apiResponse.setMessage("Sales already approved.");
                return apiResponse;
            }

            // Check if the product exists in the warehouse
            ProductionProduct productionProduct = sales.getProductionProduct();
            Warehouse warehouse = productionProduct.getWarehouse();

            if (warehouse == null || productionProduct.getQuantity() < sales.getQuantity()) {
                apiResponse.setMessage("Insufficient stock in the warehouse.");
                return apiResponse;
            }

            // Deduct quantity in the warehouse
            productionProduct.setQuantity(productionProduct.getQuantity() - sales.getQuantity());
            prodProductRepository.save(productionProduct);

            // Update sales status to APPROVED
            sales.setStatus(Sales.Status.APPROVED);
            salesRepository.save(sales);

            apiResponse.setSuccess(true);
            apiResponse.setMessage("Sales approved and warehouse quantity updated successfully.");
            apiResponse.setData("sales", sales);

        } catch (Exception e) {
            apiResponse.setMessage("Error approving sales: " + e.getMessage());
        }

        return apiResponse;
    }
}

