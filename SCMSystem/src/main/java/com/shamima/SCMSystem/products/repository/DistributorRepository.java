package com.shamima.SCMSystem.products.repository;

import com.shamima.SCMSystem.products.entity.Distributor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DistributorRepository extends JpaRepository<Distributor, Long> {

}
