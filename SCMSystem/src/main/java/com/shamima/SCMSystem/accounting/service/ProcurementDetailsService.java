package com.shamima.SCMSystem.accounting.service;

import com.shamima.SCMSystem.accounting.entity.ProcurementDetails;
import com.shamima.SCMSystem.accounting.entity.SalesDetails;
import com.shamima.SCMSystem.accounting.repository.ProcurementDetailsRepository;
import com.shamima.SCMSystem.accounting.repository.SalesDetailsRepository;
import com.shamima.SCMSystem.util.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class ProcurementDetailsService {

    @Autowired
    private ProcurementDetailsRepository procurementDetailsRepository;


    public ApiResponse getAllProcurementDetails() {
        ApiResponse apiResponse = new ApiResponse(false);
        try {
            List<ProcurementDetails> allProcurementDetails = procurementDetailsRepository.findAll();
            apiResponse.setSuccess(true);
            apiResponse.setData("procurementDetails", allProcurementDetails);
        } catch (Exception e) {
            apiResponse.setMessage(e.getMessage());
        }
        return apiResponse;
    }


    public ApiResponse getProcurementDetailsGroupedByProcurementId() {
        ApiResponse apiResponse = new ApiResponse(false);
        try {
            List<ProcurementDetails> allProcurementDetails = procurementDetailsRepository.findAll();

            Map<Long, List<ProcurementDetails>> groupedProcurementDetails = allProcurementDetails.stream()
                    .collect(Collectors.groupingBy(sd -> sd.getProcurement().getId()));

            apiResponse.setSuccess(true);
            apiResponse.setData("groupedProcurementDetails", groupedProcurementDetails);
        } catch (Exception e) {
            apiResponse.setMessage(e.getMessage());
        }
        return apiResponse;
    }
}
