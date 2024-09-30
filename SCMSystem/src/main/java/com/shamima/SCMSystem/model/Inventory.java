package com.shamima.SCMSystem.model;

import com.shamima.SCMSystem.model.account.Procurement;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Date;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "inventory")
public class Inventory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "inventory_id")
    private Long inventoryID;

    @ManyToOne
    @JoinColumn(name = "material_id")
    private RawMaterial rawMaterial;

    @Column(name = "quantity_in_stock")
    private int quantityInStock;

    @Column(name = "unit_price")
    private Double unitPrice;

    @Column(name = "last_stock_update_date")
    private Date lastStockUpdateDate;



    @ManyToOne
    @JoinColumn(name = "procurement_id")
    private Procurement procurement;
}
