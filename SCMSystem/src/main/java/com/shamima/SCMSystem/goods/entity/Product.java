package com.shamima.SCMSystem.goods.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "prod_products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "unit_price", nullable = false)
    private Double unitPrice;

    @Column(name = "stock", nullable = false)
    private Integer stock;

    private String batch;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(nullable = false, name = "inventory_id")
    private Inventory inventory;

    @Enumerated(EnumType.STRING)
    @Column(name = "unit", nullable = false)
    private RawMaterial.Unit unit;

    public enum Unit {
        METER,
        PIECE,
        FEET,
        INCH,
        KG,
        GRAM
    }

}
