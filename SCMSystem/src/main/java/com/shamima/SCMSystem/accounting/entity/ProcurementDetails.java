package com.shamima.SCMSystem.accounting.entity;

import com.shamima.SCMSystem.goods.entity.RawMaterial;
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
@Table(name = "acc_procurement_details")
public class ProcurementDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne
    @JoinColumn(name = "procurement_id")
    private Procurement procurement;

    @ManyToOne
    @JoinColumn(name = "rawmaterial_id")
    private RawMaterial rawMaterial;

    private int quantity;

    private double unitPrice;
    private double totalPrice;
//    private double discount;

}
