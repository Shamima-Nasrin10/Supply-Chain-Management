package com.shamima.SCMSystem.production.repository;

import com.shamima.SCMSystem.goods.entity.Inventory;
import com.shamima.SCMSystem.production.entity.Warehouse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface WarehouseRepository extends JpaRepository<Warehouse, Long> {
    List<Inventory> findInventoryById(Long id);
}
