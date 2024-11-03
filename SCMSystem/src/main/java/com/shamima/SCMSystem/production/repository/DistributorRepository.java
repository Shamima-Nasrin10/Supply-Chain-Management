package com.shamima.SCMSystem.production.repository;

import com.shamima.SCMSystem.production.entity.Distributor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DistributorRepository extends JpaRepository<Distributor, Long> {

}
