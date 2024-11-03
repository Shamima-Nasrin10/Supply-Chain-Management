package com.shamima.SCMSystem.accounting.restcontroller;

import com.shamima.SCMSystem.accounting.entity.Sales;
import com.shamima.SCMSystem.accounting.service.SalesService;
import com.shamima.SCMSystem.util.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/sales")
public class SalesController {

    @Autowired
    private SalesService salesService;


    @GetMapping("/list")
    public ApiResponse getAllSales() {
        return salesService.getAllSales();
    }


    @PostMapping("/save")
    public ApiResponse saveSales(@RequestBody Sales sales) {
        return salesService.saveSales(sales);
    }

    @DeleteMapping("/delete/{id}")
    public ApiResponse deleteSalesById(@PathVariable long id) {
        return salesService.deleteSalesById(id);
    }

}
