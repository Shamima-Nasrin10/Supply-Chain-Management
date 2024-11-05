
package com.shamima.SCMSystem.production.restcontroller;

import com.shamima.SCMSystem.production.entity.ProductionProduct;
import com.shamima.SCMSystem.production.service.ProdProductService;
import com.shamima.SCMSystem.util.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/productionProduct")
public class ProdProductController {

    @Autowired
    private ProdProductService prodProductService;

    @PostMapping("/save")
    public ApiResponse save(ProductionProduct productionProduct) {
        return prodProductService.saveProdProduct(productionProduct);
    }

}

