package com.shamima.SCMSystem.production.entity;

import com.shamima.SCMSystem.goods.entity.RawMaterial;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "rawmat_usage")
public class RawMatUsage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "rawmaterial_id")
    private RawMaterial rawMaterial;

    private int quantity;

    @ManyToOne
    @JoinColumn(name = "production_product_id")
    private ProductionProduct productionProduct;


}
