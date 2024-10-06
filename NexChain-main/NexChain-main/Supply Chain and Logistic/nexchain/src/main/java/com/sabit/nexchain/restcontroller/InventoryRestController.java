package com.sabit.nexchain.restcontroller;


import com.sabit.nexchain.model.Inventory;
import com.sabit.nexchain.model.Stock;
import com.sabit.nexchain.repository.InventoryRepository;
import com.sabit.nexchain.repository.RawMaterialRepository;
import com.sabit.nexchain.repository.StockRepository;
import com.sabit.nexchain.service.InventoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/inventory")
public class InventoryRestController {

    @Autowired
    private InventoryRepository inventoryRepository;

    @Autowired
    private RawMaterialRepository rawMaterialRepository;

    @Autowired
    private InventoryService inventoryService;


    @Autowired
    private StockRepository stockRepository;



    @PostMapping("/save")
    public ResponseEntity<String> saveInventory(@RequestBody Inventory inventory){
        // Check if inventory for this procurement ID already exists
        Optional<Inventory> existingInventory=inventoryRepository.findByProcurement_Id(inventory.getProcurement().getId());

        if (existingInventory.isPresent()){
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Inventory for Procurement ID "+inventory.getProcurement().getId()+ " already exists");
        }

        // Call the addToInventory method in the InventoryService to add inventory
        inventoryService.addToInventory(inventory.getRawMaterial(),inventory.getQuantityInStock(),inventory.getUnitPrice(), inventory.getProcurement().getId());
        return ResponseEntity.status(HttpStatus.CREATED).body("Inventory Saved Successfully");
    }



    @GetMapping("/inventory-details")
    public ResponseEntity<List<Inventory>> showInventoryDetails() {
        List<Inventory> inventorySummary = inventoryRepository.findAll();
        return new ResponseEntity<>(inventorySummary, HttpStatus.OK);
    }

    @GetMapping("/stock-details")
    public ResponseEntity<List<Stock>> showStockDetails() {
        List<Stock> stockSummary = stockRepository.findAll();
        return new ResponseEntity<>(stockSummary, HttpStatus.OK);
    }


}
