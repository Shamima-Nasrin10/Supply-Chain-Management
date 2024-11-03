package com.shamima.SCMSystem.accounting.service;

import com.shamima.SCMSystem.accounting.entity.Procurement;
import com.shamima.SCMSystem.accounting.entity.ProcurementDetails;
import com.shamima.SCMSystem.accounting.repository.ProcurementDetailsRepository;
import com.shamima.SCMSystem.accounting.repository.ProcurementRepository;
import com.shamima.SCMSystem.goods.entity.RawMaterial;
import com.shamima.SCMSystem.goods.repository.RawMaterialRepository;
import com.shamima.SCMSystem.util.ApiResponse;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProcurementService {

    @Autowired
    private RawMaterialRepository rawMaterialRepository;

    @Autowired
    private ProcurementRepository procurementRepository;

    @Autowired
    private ProcurementDetailsRepository procurementDetailsRepository;


    public ApiResponse getAllProcurement() {
        ApiResponse apiResponse = new ApiResponse(false);
        try {
            List<Procurement> procurementList = procurementRepository.findAll();
            apiResponse.setSuccess(true);
            apiResponse.setData("procurements", procurementList);
        } catch (Exception e) {
            apiResponse.setMessage(e.getMessage());
        }
        return apiResponse;
    }

    @Transactional
    public ApiResponse saveProcurement(Procurement procurement) {
        ApiResponse apiResponse = new ApiResponse(false);
        try {
            // Save the procurement first to get the generated ID
            Procurement savedProcurement = procurementRepository.save(procurement);

            // Update product stock
            // Create SalesDetails for each product
            savedProcurement.getRawMaterial().forEach(purchasedRawMaterial -> {
                RawMaterial rawMaterial = rawMaterialRepository.findById(purchasedRawMaterial.getId())
                        .orElseThrow(() -> new RuntimeException("Product not found with ID " + purchasedRawMaterial.getId()));
                int newStock = rawMaterial.getStock() + purchasedRawMaterial.getQuantity();
                if (newStock < 0) {
                    throw new RuntimeException("Not enough stock for product " + rawMaterial.getName());
                }
                rawMaterial.setStock(newStock);
                rawMaterialRepository.save(rawMaterial);
                ProcurementDetails procurementDetails = new ProcurementDetails();
                procurementDetails.setProcurement(savedProcurement);
                procurementDetails.setRawMaterial(rawMaterial);
                procurementDetails.setQuantity(purchasedRawMaterial.getQuantity());
                procurementDetails.setUnitPrice(rawMaterial.getPrice());
//                procurementDetails.setDiscount(procurement.getDiscount());
//                double discount = procurement.getDiscount();
                double unitPrice = rawMaterial.getPrice();
                long quantity = purchasedRawMaterial.getQuantity();
                double totalPrice = quantity * unitPrice;
                procurementDetails.setTotalPrice(totalPrice);
                procurementDetailsRepository.save(procurementDetails);
            });

            apiResponse.setSuccess(true);
            apiResponse.setMessage("Procurement saved successfully");
            apiResponse.setData("procurement", savedProcurement);
        } catch (Exception e) {
            apiResponse.setMessage(e.getMessage());
        }
        return apiResponse;
    }

    // Delete Sales by ID
    @Transactional
    public ApiResponse deleteProcurementById(long id) {
        ApiResponse apiResponse = new ApiResponse(false);
        try {
            if (procurementRepository.existsById(id)) {
                procurementRepository.deleteById(id);
                apiResponse.setSuccess(true);
                apiResponse.setMessage("Sales deleted successfully");
            } else {
                apiResponse.setMessage("Sales not found with ID " + id);
            }
        } catch (Exception e) {
            apiResponse.setMessage(e.getMessage());
        }
        return apiResponse;
    }

}
