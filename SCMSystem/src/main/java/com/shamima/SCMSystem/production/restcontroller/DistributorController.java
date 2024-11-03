package com.shamima.SCMSystem.production.restcontroller;


import com.shamima.SCMSystem.production.entity.Distributor;
import com.shamima.SCMSystem.production.service.DistributorService;
import com.shamima.SCMSystem.util.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/retailer")
public class DistributorController {
    @Autowired
    private DistributorService retailerService;

    @GetMapping("/list")
    public ApiResponse getAllRetailers() {
        return retailerService.getAllRetailers();
    }

    @GetMapping("/{id}")
    public ApiResponse getRetailerById(@PathVariable long id) {
        return retailerService.getRetailerById(id);
    }

    @PostMapping("/save")
    public ApiResponse saveRetailer(@RequestBody Distributor retailer) {
        return retailerService.saveRetailer(retailer);
    }

    @PutMapping("/update")
    public ApiResponse updateRetailer(@RequestBody Distributor retailer) {
        return retailerService.updateRetailer(retailer);
    }

    @DeleteMapping("/delete/{id}")
    public ApiResponse deleteRetailer(@PathVariable long id) {
        return retailerService.deleteRetailer(id);
    }
}
