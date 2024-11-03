package com.shamima.SCMSystem.goods.entity;

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
@Table(name = "inv_raw_materials")
public class RawMaterial {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", nullable = false)
    private String name;
    
    @Column(name = "price")
    private Double price;
    
    @Column(name = "quantity")
    private Integer quantity;

    @Column(name = "stock")
    private Integer stock;

    @Enumerated(EnumType.STRING)
    @Column(name = "unit")
    private Unit unit;


    private String image;
    
    @ManyToOne()
    @JoinColumn(name = "category_id")
    private RawMaterialCategory category;

    @ManyToOne()
    @JoinColumn(name = "supplier_id", nullable = false)
    private RawMaterialSupplier supplier;

    @ManyToOne() // This establishes the relationship with Inventory
    @JoinColumn(name = "inventory_id", nullable = false) // Foreign key column in RawMaterial
    private Inventory inventory;

    public enum Unit {
        LETTER,
        PIECE,
        KG,
        GRAM
    }
    
}
