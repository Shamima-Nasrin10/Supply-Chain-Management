package com.shamima.SCMSystem.model.production;


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

    @ManyToOne
    @JoinColumn(name = "warehouse_id")
    private ProductWarehouse productWarehouse;

    @Enumerated(EnumType.STRING)
    private Unit unit;

    public enum Unit {
        METER,
        PIECE,
        FEET,
        INCH,
        KG,
        GRAM
    }
}
