package com.shamima.SCMSystem.products.repository;

import com.shamima.SCMSystem.products.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

}
