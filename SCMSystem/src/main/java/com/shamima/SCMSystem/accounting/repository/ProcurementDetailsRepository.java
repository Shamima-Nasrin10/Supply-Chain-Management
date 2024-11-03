package com.shamima.SCMSystem.accounting.repository;

import com.shamima.SCMSystem.accounting.entity.ProcurementDetails;
import com.shamima.SCMSystem.accounting.entity.SalesDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProcurementDetailsRepository extends JpaRepository<ProcurementDetails, Long> {

    List<ProcurementDetails> findByProcurementId(long procurementId);
//    List<SalesDetails> findSalesDetailsGroupedBySalesId();
}
