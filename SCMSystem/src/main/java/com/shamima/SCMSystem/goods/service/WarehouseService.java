package com.shamima.SCMSystem.goods.service;

import com.shamima.SCMSystem.goods.entity.Inventory;
import com.shamima.SCMSystem.goods.entity.Product;
import com.shamima.SCMSystem.goods.entity.Warehouse;
import com.shamima.SCMSystem.goods.repository.InventoryRepository;
import com.shamima.SCMSystem.goods.repository.ProductRepository;
import com.shamima.SCMSystem.goods.repository.WarehouseRepository;
import com.shamima.SCMSystem.util.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

@Service
public class WarehouseService {
    @Autowired
    private WarehouseRepository warehouseRepository;

    @Autowired
    private InventoryRepository inventoryRepository;

    @Autowired
    private ProductRepository productRepository;

    public ApiResponse getAllWarehouses() {
        ApiResponse apiResponse = new ApiResponse(false);
        try {
            List<Warehouse> warehouses = warehouseRepository.findAll();
            apiResponse.setSuccess(true);
            apiResponse.setData("warehouses", warehouses);
        } catch (Exception e) {
            apiResponse.setMessage(e.getMessage());
        }
        return apiResponse;
    }

    public ApiResponse findWarehouseById(long id) {
        ApiResponse apiResponse = new ApiResponse(false);
        try {
            Warehouse warehouse = warehouseRepository.findById(id).orElse(null);
            if (warehouse == null) {
                apiResponse.setMessage("Warehouse not found");
                return apiResponse;
            }
            apiResponse.setSuccess(true);
            apiResponse.setData("warehouse", warehouse);
            apiResponse.setData("inventories", warehouse.getInventories());  // Include inventories
        } catch (Exception e) {
            apiResponse.setMessage(e.getMessage());
        }
        return apiResponse;
    }

    @Transactional
    public ApiResponse saveWarehouse(Warehouse warehouse) {
        ApiResponse apiResponse = new ApiResponse(false);
        try {
            warehouseRepository.save(warehouse);
            apiResponse.setSuccess(true);
            apiResponse.setMessage("Warehouse saved successfully");
        } catch (Exception e) {
            apiResponse.setMessage(e.getMessage());
        }
        return apiResponse;
    }

    @Transactional
    public ApiResponse updateWarehouse(Warehouse updatedWarehouse) {
        ApiResponse apiResponse = new ApiResponse(false);
        try {
            Warehouse existingWarehouse = warehouseRepository.findById(updatedWarehouse.getId()).orElse(null);
            if (existingWarehouse == null) {
                apiResponse.setMessage("Warehouse not found");
                return apiResponse;
            }

            // Update warehouse details
            existingWarehouse.setName(updatedWarehouse.getName());
            existingWarehouse.setLocation(updatedWarehouse.getLocation());

            warehouseRepository.save(existingWarehouse);
            apiResponse.setSuccess(true);
            apiResponse.setMessage("Warehouse updated successfully");
        } catch (Exception e) {
            apiResponse.setMessage(e.getMessage());
        }
        return apiResponse;
    }

    @Transactional
    public ApiResponse deleteWarehouseById(long id) {
        ApiResponse apiResponse = new ApiResponse(false);
        try {
            Warehouse warehouse = warehouseRepository.findById(id).orElse(null);
            if (warehouse == null) {
                apiResponse.setMessage("Warehouse not found");
                return apiResponse;
            }

            warehouseRepository.deleteById(id);
            apiResponse.setSuccess(true);
            apiResponse.setMessage("Warehouse deleted successfully");
        } catch (Exception e) {
            apiResponse.setMessage(e.getMessage());
        }
        return apiResponse;
    }

    @Transactional
    public ApiResponse addInventoryToWarehouse(Long id, Inventory inventory) {
        ApiResponse apiResponse = new ApiResponse(false);
        try {
            Warehouse warehouse = warehouseRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Warehouse not found with ID: " + id));

            inventory.setWarehouse(warehouse);
            inventoryRepository.save(inventory);

            apiResponse.setSuccess(true);
            apiResponse.setMessage("Inventory added to warehouse successfully");
        } catch (Exception e) {
            apiResponse.setMessage("Failed to add inventory to warehouse: " + e.getMessage());
        }
        return apiResponse;
    }

}
