package com.shamima.SCMSystem.accounting.restcontroller;
import com.shamima.SCMSystem.accounting.entity.SalesDetails;
import com.shamima.SCMSystem.accounting.service.SalesDetailsService;
import com.shamima.SCMSystem.util.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/salesdetails")
public class SalesDetailsController {

    @Autowired
    private SalesDetailsService salesDetailsService;

    @GetMapping("/list")
    public ApiResponse getAllSalesDetails() {
        return salesDetailsService.getAllSalesDetails();
    }

    @GetMapping("/grouped")
    public ApiResponse getGroupedSalesDetails() {
        return salesDetailsService.getSalesDetailsGroupedBySalesId();
    }
}
