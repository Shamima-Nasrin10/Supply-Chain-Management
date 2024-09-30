package com.shamima.SCMSystem.model.account;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Date;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "payment_id")
    private Long paymentID;

    @ManyToOne
    @JoinColumn(name = "procurement_id")
    private Procurement procurement;

    @Column(name = "payment_account")
    private String paymentAccount;

    @Column(name = "payment_amount")
    private double paymentAmount;

    @Column(name = "payment_date")
    private Date paymentDate;
}
