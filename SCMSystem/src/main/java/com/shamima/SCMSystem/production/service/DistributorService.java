package com.shamima.SCMSystem.production.service;

import com.shamima.SCMSystem.production.entity.Distributor;
import com.shamima.SCMSystem.production.repository.DistributorRepository;
import com.shamima.SCMSystem.util.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DistributorService {

    @Autowired
    private DistributorRepository retailerRepository;

    public ApiResponse getAllRetailers() {
        ApiResponse apiResponse = new ApiResponse(false);
        try {
            List<Distributor> retailers = retailerRepository.findAll();
            apiResponse.setSuccess(true);
            apiResponse.setData("retailers", retailers);
            return apiResponse;
        } catch (Exception e) {
            apiResponse.setMessage(e.getMessage());
            return apiResponse;
        }
    }

    public ApiResponse saveRetailer(Distributor retailer) {
        ApiResponse apiResponse = new ApiResponse(false);
        try {
            retailerRepository.save(retailer);
            apiResponse.setSuccess(true);
            apiResponse.setMessage("Retailer saved successfully");
            return apiResponse;
        } catch (Exception e) {
            apiResponse.setMessage(e.getMessage());
            return apiResponse;
        }
    }

    public ApiResponse updateRetailer(Distributor retailer) {
        ApiResponse apiResponse = new ApiResponse(false);
        try {
            Distributor existingRetailer = retailerRepository.findById(retailer.getId()).orElse(null);
            if (existingRetailer == null) {
                apiResponse.setMessage("Retailer not found");
                return apiResponse;
            }
            retailerRepository.save(retailer);
            apiResponse.setSuccess(true);
            apiResponse.setMessage("Retailer updated successfully");
            return apiResponse;
        } catch (Exception e) {
            apiResponse.setMessage(e.getMessage());
            return apiResponse;
        }
    }

    public ApiResponse deleteRetailer(Long id) {
        ApiResponse apiResponse = new ApiResponse(false);
        try {
            Distributor retailer = retailerRepository.findById(id).orElse(null);
            if (retailer == null) {
                apiResponse.setMessage("Retailer not found");
                return apiResponse;
            }
            retailerRepository.deleteById(id);
            apiResponse.setSuccess(true);
            apiResponse.setMessage("Retailer deleted successfully");
            return apiResponse;
        } catch (Exception e) {
            apiResponse.setMessage(e.getMessage());
            return apiResponse;
        }
    }

    public ApiResponse getRetailerById(Long id) {
        ApiResponse apiResponse = new ApiResponse(false);
        try {
            Distributor retailer = retailerRepository.findById(id).orElse(null);
            if (retailer == null) {
                apiResponse.setMessage("Retailer not found");
                return apiResponse;
            }
            apiResponse.setSuccess(true);
            apiResponse.setData("retailer", retailer);
            return apiResponse;
        } catch (Exception e) {
            apiResponse.setMessage(e.getMessage());
            return apiResponse;
        }
    }
}
