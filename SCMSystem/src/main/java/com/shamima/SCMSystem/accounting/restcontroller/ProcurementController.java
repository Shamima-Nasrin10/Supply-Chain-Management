package com.shamima.SCMSystem.accounting.restcontroller;

import com.shamima.SCMSystem.accounting.entity.Procurement;
import com.shamima.SCMSystem.accounting.entity.Sales;
import com.shamima.SCMSystem.accounting.service.ProcurementService;
import com.shamima.SCMSystem.accounting.service.SalesService;
import com.shamima.SCMSystem.util.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/procurement")
public class ProcurementController {

    @Autowired
    private ProcurementService procurementService;


    @GetMapping("/list")
    public ApiResponse getAllSales() {
        return procurementService.getAllProcurement();
    }


    @PostMapping("/save")
    public ApiResponse saveSales(@RequestBody Procurement procurement) {
        return procurementService.saveProcurement(procurement);
    }

    @DeleteMapping("/delete/{id}")
    public ApiResponse deleteProcurementById(@PathVariable long id) {
        return procurementService.deleteProcurementById(id);
    }

}
