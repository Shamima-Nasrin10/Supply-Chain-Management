package com.sabit.nexchain.repository;

import com.sabit.nexchain.model.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface PaymentRepository extends JpaRepository<Payment, Long> {

    @Query("SELECT SUM(p.paymentAmount) FROM Payment p")
    Double getTotalPaymentAmount();





}
