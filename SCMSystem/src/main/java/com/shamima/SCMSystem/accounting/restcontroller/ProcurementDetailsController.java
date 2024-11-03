package com.shamima.SCMSystem.accounting.restcontroller;
import com.shamima.SCMSystem.accounting.service.ProcurementDetailsService;
import com.shamima.SCMSystem.accounting.service.SalesDetailsService;
import com.shamima.SCMSystem.util.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/procurementdetails")
public class ProcurementDetailsController {

    @Autowired
    private ProcurementDetailsService procurementDetailsService;

    @GetMapping("/list")
    public ApiResponse getAllProcurementDetails() {
        return procurementDetailsService.getAllProcurementDetails();
    }

    @GetMapping("/grouped")
    public ApiResponse getGroupedSalesDetails() {
        return procurementDetailsService.getProcurementDetailsGroupedByProcurementId();
    }
}
