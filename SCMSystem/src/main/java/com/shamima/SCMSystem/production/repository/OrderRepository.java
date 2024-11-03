package com.shamima.SCMSystem.production.repository;

import com.shamima.SCMSystem.production.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

}
