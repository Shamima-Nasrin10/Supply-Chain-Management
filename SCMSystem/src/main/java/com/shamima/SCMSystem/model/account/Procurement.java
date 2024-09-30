package com.shamima.SCMSystem.model.account;

import com.shamima.SCMSystem.model.RawMaterial;
import com.shamima.SCMSystem.model.Supplier;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.sql.Date;

@Entity
@Getter
@Setter
@AllArgsConstructor
@Table(name = "acc_procurement")
public class Procurement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "procurement_id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "supplier_id")
    private Supplier supplier;

    @ManyToOne
    @JoinColumn(name = "material_id")
    private RawMaterial rawMaterial;

    @Column(name = "quantity")
    private int quantity;

    @Column(name = "unit_price")
    private double unitPrice;

    @Column(name = "total_price")
    private double totalPrice;

    @Column(name = "procurement_date")
    private Date procurementDate;



    // Default constructor
    public Procurement() {
    }

    // Constructor with String argument for id
    public Procurement(String id) {
        this.id = Long.parseLong(id);
    }

}
