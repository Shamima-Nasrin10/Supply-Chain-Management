package com.sabit.nexchain.controller;


import com.sabit.nexchain.model.Inventory;
import com.sabit.nexchain.model.Procurement;
import com.sabit.nexchain.model.RawMaterial;
import com.sabit.nexchain.model.Stock;
import com.sabit.nexchain.repository.InventoryRepository;
import com.sabit.nexchain.repository.ProcurementRepository;
import com.sabit.nexchain.repository.RawMaterialRepository;
import com.sabit.nexchain.repository.StockRepository;
import com.sabit.nexchain.service.InventoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.Banner;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;
import java.util.Optional;

@Controller
public class InventoryController {

    @Autowired
    private InventoryRepository inventoryRepository;


    @Autowired
    private RawMaterialRepository rawMaterialRepository;


    @Autowired
    private ProcurementRepository procurementRepository;

    @Autowired
    private InventoryService inventoryService;

    @Autowired
    private StockRepository stockRepository;






    @GetMapping("/inventory-form")
    public  String showInventoryForm(Model model){
        List<RawMaterial> rawMaterials=rawMaterialRepository.findAll();
        model.addAttribute("rawMaterials", rawMaterials);
        model.addAttribute("inventory", new Inventory());
        return "inventory-form";
    }


    @PostMapping("saveInventory")
    public String saveInventory(@ModelAttribute Inventory inventory, Model model) {
        Long procurementId = inventory.getProcurement().getId();

        // Check if inventory for this procurement ID already exists
        Optional<Inventory> existingInventory = inventoryRepository.findByProcurement_Id(procurementId);

        if (existingInventory.isPresent()) {
            model.addAttribute("message", "Inventory for Procurement ID " + procurementId + " already exists");
            return "inventory-form";
        }

        // Call the addToInventory method in the InventoryService to add inventory
        inventoryService.addToInventory(inventory.getRawMaterial(), inventory.getQuantityInStock(),inventory.getUnitPrice());
        inventoryRepository.save(inventory);

        // After adding inventory, you can redirect or return the appropriate view
        return "redirect:/inventory-form";
    }


//    @PostMapping("/saveInventory")
//    public String saveInventory(@ModelAttribute Inventory inventory){
//        inventoryRepository.save(inventory);
//        return "redirect:/inventory-form";
//    }


//    @PostMapping("saveInventory")
//    public String saveInventory(@ModelAttribute Inventory inventory, Model model){
//        Long procurementId=inventory.getProcurementId();
//
//        Optional<Inventory> existingInventory=inventoryRepository.findByProcurementId(procurementId);
//
//    if (existingInventory.isPresent()){
//        model.addAttribute("message", "Inventory form Procurement Id "+ procurementId+ " already exists");
//        return "inventory-form";
//    }
//    inventoryRepository.save(inventory);
//
//    return "redirect:/inventory-form";
//    }







    @GetMapping("/getProcurementData")
    public String getProcurementData(@RequestParam Long procurementId, Model model){
        Optional<Procurement> procurementOptional = procurementRepository.findById(procurementId);

        if (procurementOptional.isPresent()) {
            Procurement procurement = procurementOptional.get();
            model.addAttribute("procurement", procurement);
        } else {
            model.addAttribute("procurement", null);
        }

        return "inventory-form :: procurement-data";
    }




//    @PostMapping("saveInventory")
//    public String saveInventory(@ModelAttribute Inventory inventory, Model model) {
//        Long procurementId = inventory.getProcurement().getId();
//
//
//
//        Optional<Inventory> existingInventory = inventoryRepository.findByProcurement_Id(procurementId);
//
//        if (existingInventory.isPresent()) {
//            model.addAttribute("message", "Inventory form for Procurement ID " + procurementId + " already exists");
//            return "inventory-form";
//        }
//
//        Optional<Procurement> procurementOptional = procurementRepository.findById(procurementId);
//
//        if (procurementOptional.isPresent()) {
//            Procurement procurement = procurementOptional.get();
//            inventory.setProcurement(procurement);
//            inventoryRepository.save(inventory);
//            return "redirect:/inventory-form";
//        } else {
//            model.addAttribute("message", "No procurement data found for Procurement ID " + procurementId);
//            return "inventory-form";
//        }
//    }








    @GetMapping("/inventory-details")
    public String showInventoryDetails(Model model){
        List<Object[]> inventorySummary=inventoryRepository.getInventorySummary();
        model.addAttribute("inventorySummary", inventorySummary);
        return "inventory-details";
    }



    @GetMapping("/stock-details")
    public String showStockDetails(Model model){
        List<Stock> stockSummary=stockRepository.findAll();

        model.addAttribute("stockSummary", stockSummary);
        return "stock-details";
    }
}
