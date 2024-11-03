package com.shamima.SCMSystem.accounting.entity;

import com.shamima.SCMSystem.production.entity.Product;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "acc_sales_details")
public class SalesDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne
    @JoinColumn(name = "sales_id", nullable = false)
    private Sales sale;

    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    private int quantity;

    private double unitPrice;
    private double totalPrice;
    private double discount;


}
