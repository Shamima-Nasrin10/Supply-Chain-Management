package com.shamima.SCMSystem.goods.service;


import com.shamima.SCMSystem.goods.entity.RawMaterialSupplier;
import com.shamima.SCMSystem.goods.repository.RawMaterialSupplierRepository;
import com.shamima.SCMSystem.util.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RawMaterialSupplierService {

    @Autowired
    private RawMaterialSupplierRepository rawMaterialSupplierRepository;

    public ApiResponse getAllRawMaterialSuppliers() {
        ApiResponse apiResponse = new ApiResponse(false);
        try {
            List<RawMaterialSupplier> rawMaterialSuppliers = rawMaterialSupplierRepository.findAll();
            apiResponse.setSuccess(true);
            apiResponse.setData("rawMaterialSuppliers", rawMaterialSuppliers);
            return apiResponse;
        } catch (Exception e) {
            apiResponse.setMessage(e.getMessage());
            return apiResponse;
        }
    }

    public ApiResponse saveRawMaterialSupplier(RawMaterialSupplier rmSupplier) {
        ApiResponse apiResponse = new ApiResponse(false);
        try {
            rawMaterialSupplierRepository.save(rmSupplier);
            apiResponse.setSuccess(true);
            apiResponse.setMessage("Supplier saved successfully");
            return apiResponse;
        } catch (Exception e) {
            apiResponse.setMessage(e.getMessage());
            return apiResponse;
        }
    }

    public ApiResponse updateRawMaterialSupplier(RawMaterialSupplier supplier) {
        ApiResponse apiResponse = new ApiResponse(false);
        try {
            RawMaterialSupplier existingSupplier = rawMaterialSupplierRepository.findById(supplier.getId()).orElse(null);
            if (existingSupplier == null) {
                apiResponse.setMessage("Supplier not found");
                return apiResponse;
            }
            rawMaterialSupplierRepository.save(supplier);
            apiResponse.setSuccess(true);
            apiResponse.setMessage("Supplier updated successfully");
            return apiResponse;
        } catch (Exception e) {
            apiResponse.setMessage(e.getMessage());
            return apiResponse;
        }
    }

    public ApiResponse deleteRawMaterialSupplier(Long id) {
        ApiResponse apiResponse = new ApiResponse(false);
        try {
            RawMaterialSupplier supplier = rawMaterialSupplierRepository.findById(id).orElse(null);
            if (supplier == null) {
                apiResponse.setMessage("Supplier not found");
                return apiResponse;
            }
            rawMaterialSupplierRepository.deleteById(id);
            apiResponse.setSuccess(true);
            apiResponse.setMessage("Supplier deleted successfully");
            return apiResponse;
        } catch (Exception e) {
            apiResponse.setMessage(e.getMessage());
            return apiResponse;
        }
    }

    public ApiResponse getRawMaterialSupplierById(Long id) {
        ApiResponse apiResponse = new ApiResponse(false);
        try {
            RawMaterialSupplier supplier = rawMaterialSupplierRepository.findById(id).orElse(null);
            if (supplier == null) {
                apiResponse.setMessage("Supplier not found");
                return apiResponse;
            }
            apiResponse.setSuccess(true);
            apiResponse.setData("rawMaterialSupplier", supplier);
            return apiResponse;
        } catch (Exception e) {
            apiResponse.setMessage(e.getMessage());
            return apiResponse;
        }
    }

}
