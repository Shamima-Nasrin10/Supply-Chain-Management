package com.sabit.nexchain.service;


import com.sabit.nexchain.model.Inventory;
import com.sabit.nexchain.model.Procurement;
import com.sabit.nexchain.model.RawMaterial;
import com.sabit.nexchain.model.Stock;
import com.sabit.nexchain.model.product.Product;
import com.sabit.nexchain.repository.InventoryRepository;
import com.sabit.nexchain.repository.ProcurementRepository;
import com.sabit.nexchain.repository.StockRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Date;
import java.time.LocalDate;
import java.util.Map;
import java.util.Optional;

@Service
public class InventoryService {


    @Autowired
    private InventoryRepository inventoryRepository;

    @Autowired
    private StockRepository stockRepository;

    @Autowired
    private ProcurementRepository procurementRepository;


    public void addToInventory(RawMaterial rawMaterial, int quantity, double unitPrice, Long procurementId) {
        // Find the related procurement to link the supplier
        Procurement procurement = procurementRepository.findById(procurementId)
                .orElseThrow(() -> new RuntimeException("Procurement not found with ID: " + procurementId));

        // Check existing stock
        Stock existingStock = stockRepository.findByRawMaterial(rawMaterial);
        if (existingStock != null) {
            // Update existing stock quantity
            int updateQuantity = existingStock.getQuantity() + quantity;
            double previousUnitPrice = existingStock.getUnitPrice();

            // Set previous unit price
            existingStock.setPreviousPrice(previousUnitPrice);

            // Calculate price change percentage
            double percentageChange = calculatePercentageChange(previousUnitPrice, unitPrice);
            existingStock.setIncrease((percentageChange > 0) ? (int) percentageChange : 0);
            existingStock.setDecrease((percentageChange < 0) ? (int) -percentageChange : 0);

            // Update stock details
            existingStock.setLastStockUpdateDate(new Date(System.currentTimeMillis()));
            existingStock.setQuantity(updateQuantity);
            existingStock.setUnitPrice(unitPrice);

            // Link procurement to stock (optional if needed in your model)
            // existingStock.setProcurement(procurement);

            stockRepository.save(existingStock);
        } else {
            // Raw material doesn't exist in stock, create new entry
            Stock newStock = new Stock();
            newStock.setRawMaterial(rawMaterial);
            newStock.setQuantity(quantity);
            newStock.setUnitPrice(unitPrice);
            newStock.setLastStockUpdateDate(new Date(System.currentTimeMillis()));

            // Link procurement to new stock
            newStock.setProcurement(procurement); // Set procurement to link the supplier info

            stockRepository.save(newStock);

            newStock.setIncrease(0);
            newStock.setDecrease(0);
        }

        // Optionally save to Inventory
        Inventory inventoryEntry = new Inventory();
        inventoryEntry.setRawMaterial(rawMaterial);
        inventoryEntry.setQuantityInStock(quantity);
        inventoryEntry.setUnitPrice(unitPrice);
        inventoryEntry.setLastStockUpdateDate(new Date(System.currentTimeMillis()));
        inventoryEntry.setProcurement(procurement); // Set procurement with supplier info

        inventoryRepository.save(inventoryEntry);
    }

    /**
     * Helper method to calculate the percentage change between prices.
     */
    private double calculatePercentageChange(double previousPrice, double newPrice) {
        return ((newPrice - previousPrice) / previousPrice) * 100;
    }

    /**
     * Update inventory based on production requirements.
     */
    private void updateInventory(String materialName, int quantity) {
        Inventory inventoryEntry = inventoryRepository.findByRawMaterial_MaterialName(materialName);

        int currentQuantity = inventoryEntry.getQuantityInStock();
        inventoryEntry.setQuantityInStock(currentQuantity - quantity);
        inventoryEntry.setLastStockUpdateDate(Date.valueOf(LocalDate.now()));

        inventoryRepository.save(inventoryEntry);
    }

}
