package com.shamima.SCMSystem.accounting.service;

import com.shamima.SCMSystem.accounting.entity.Procurement;
import com.shamima.SCMSystem.accounting.repository.ProcurementRepository;
import com.shamima.SCMSystem.goods.entity.RawMaterial;
import com.shamima.SCMSystem.goods.entity.RawMaterialStock;
import com.shamima.SCMSystem.goods.repository.RMStockRepository;
import com.shamima.SCMSystem.goods.repository.RawMaterialRepository;
import com.shamima.SCMSystem.util.ApiResponse;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ProcurementService {

    @Autowired
    private RawMaterialRepository rawMaterialRepository;

    @Autowired
    private ProcurementRepository procurementRepository;

    @Autowired
    private RMStockRepository rmStockRepository;

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
    public ApiResponse saveProcurements(List<Procurement> procurements) {
        ApiResponse apiResponse = new ApiResponse(false);
        try {
            for (Procurement procurement : procurements) {
                calculateTotalPrice(procurement);
            }
            List<Procurement> savedProcurements = procurementRepository.saveAll(procurements);

            for (Procurement procurement : savedProcurements) {
                if (procurement.getStatus().equals(Procurement.Status.APPROVED)) {
                    updateRawMaterialStock(procurement);
                }
            }

            apiResponse.setSuccess(true);
            apiResponse.setMessage("Procurements saved successfully");
            apiResponse.setData("procurements", savedProcurements);
        } catch (Exception e) {
            apiResponse.setMessage(e.getMessage());
        }
        return apiResponse;
    }

    @Transactional
    public ApiResponse saveProcurement(Procurement procurement) {
        ApiResponse apiResponse = new ApiResponse(false);
        try {
            calculateTotalPrice(procurement);
            Procurement savedProcurement = procurementRepository.save(procurement);

            if (procurement.getStatus().equals(Procurement.Status.APPROVED)) {
                updateRawMaterialStock(procurement);
            }

            apiResponse.setSuccess(true);
            apiResponse.setMessage("Procurement saved successfully");
            apiResponse.setData("procurement", savedProcurement);
        } catch (Exception e) {
            apiResponse.setMessage(e.getMessage());
        }
        return apiResponse;
    }
    private void calculateTotalPrice(Procurement procurement) {
        procurement.setTotalPrice(procurement.getQuantity() * procurement.getUnitPrice());
    }

    private void updateRawMaterialStock(Procurement procurement) {
        RawMaterial rawMaterial = procurement.getRawMaterial();
        RawMaterialStock stock = rmStockRepository.findByRawMaterial(rawMaterial);

        if (stock != null) {
            stock.setQuantity(stock.getQuantity() + procurement.getQuantity());
        } else {
            stock = new RawMaterialStock();
            stock.setRawMaterial(rawMaterial);
            stock.setQuantity(procurement.getQuantity());
            stock.setCreatedDate(LocalDateTime.now());
            stock.setLastUpdatedDate(LocalDateTime.now());
        }
        rmStockRepository.save(stock);
    }

    @Transactional
    public ApiResponse deleteProcurementById(long id) {
        ApiResponse apiResponse = new ApiResponse(false);
        try {
            if (procurementRepository.existsById(id)) {
                Procurement procurement = procurementRepository.findById(id).orElse(null);
                if (procurement == null) {
                    apiResponse.setMessage("Procurement not found");
                    return apiResponse;
                }

                procurementRepository.deleteById(id);

                apiResponse.setSuccess(true);
                apiResponse.setMessage("Procurement deleted successfully");
            } else {
                apiResponse.setMessage("Procurement not found with ID " + id);
            }
        } catch (Exception e) {
            apiResponse.setMessage(e.getMessage());
        }
        return apiResponse;
    }

    @Transactional
    public ApiResponse updateProcurement(long id, Procurement updatedProcurement) {
        ApiResponse apiResponse = new ApiResponse(false);
        try {
            Procurement existingProcurement = procurementRepository.findById(id).orElse(null);

            if (existingProcurement == null) {
                apiResponse.setMessage("Procurement not found with ID " + id);
                return apiResponse;
            }

            // Update fields in existing procurement based on the new procurement data
            existingProcurement.setQuantity(updatedProcurement.getQuantity());
            existingProcurement.setUnitPrice(updatedProcurement.getUnitPrice());
            existingProcurement.setStatus(updatedProcurement.getStatus());
            existingProcurement.setProcurementDate(updatedProcurement.getProcurementDate());

            // Recalculate total price if quantity or unit price changed
            calculateTotalPrice(existingProcurement);

            // Save the updated procurement
            Procurement savedProcurement = procurementRepository.save(existingProcurement);

            // Update stock if status is approved and quantity has changed
            if (existingProcurement.getStatus().equals(Procurement.Status.APPROVED)) {
                updateRawMaterialStock(existingProcurement);
            }

            apiResponse.setSuccess(true);
            apiResponse.setMessage("Procurement updated successfully");
            apiResponse.setData("procurement", savedProcurement);
        } catch (Exception e) {
            apiResponse.setMessage(e.getMessage());
        }
        return apiResponse;
    }

    public ApiResponse getProcurementById(long id) {
        ApiResponse apiResponse = new ApiResponse(false);
        try {
            Procurement procurement = procurementRepository.findById(id).orElse(null);
            if (procurement == null) {
                apiResponse.setMessage("Procurement not found with ID " + id);
            } else {
                apiResponse.setSuccess(true);
                apiResponse.setData("procurement", procurement);
            }
        } catch (Exception e) {
            apiResponse.setMessage(e.getMessage());
        }
        return apiResponse;
    }

}
