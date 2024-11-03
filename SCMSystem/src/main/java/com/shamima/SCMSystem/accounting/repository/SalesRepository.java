package com.shamima.SCMSystem.accounting.repository;

import com.shamima.SCMSystem.accounting.entity.Sales;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SalesRepository extends JpaRepository<Sales, Long> {
}
