package com.sabit.nexchain.repository.logistic;

import com.sabit.nexchain.model.logistic.ProductWareHouse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface ProductWareHouseRepository extends JpaRepository<ProductWareHouse, Long> {
}
