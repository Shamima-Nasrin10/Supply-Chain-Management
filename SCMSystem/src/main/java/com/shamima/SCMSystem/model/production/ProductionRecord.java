package com.shamima.SCMSystem.model.production;


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
public class ProductionRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long productionId;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    private int productionQuantity;
    private Date productionDate;
}
