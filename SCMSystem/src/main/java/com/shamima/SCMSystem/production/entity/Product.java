package com.shamima.SCMSystem.production.entity;

import com.shamima.SCMSystem.goods.entity.Inventory;
import com.shamima.SCMSystem.goods.entity.RawMaterial;
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

    @Column(name = "name")
    private String name;

    @Column(name = "unit_price")
    private Double unitPrice;

    @Column(name = "stock")
    private Integer stock;

    private Integer quantity;

    private String batch;

    @ManyToOne() // Establishing the relationship with Warehouse
    @JoinColumn(name = "warehouse_id", nullable = false) // Foreign key column in Product
    private Warehouse warehouse;

    @Enumerated(EnumType.STRING)
    @Column(name = "unit")
    private RawMaterial.Unit unit;

    public enum Unit {
        LETTER,
        PIECE,
        KG,
        GRAM
    }

}
