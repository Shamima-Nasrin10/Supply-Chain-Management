package com.shamima.SCMSystem.accounting.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.shamima.SCMSystem.goods.entity.RawMaterial;
import com.shamima.SCMSystem.goods.entity.RawMaterialSupplier;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "acc_procurement")
public class Procurement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "supplier_id")
    private RawMaterialSupplier rawMaterialSupplier;
    private Date salesdate;
    private int totalprice;

    private int quantity;
    private float discount;


    @JsonIgnore
    @ManyToMany
    private List<RawMaterial> rawMaterial=new ArrayList<>();

    public List<RawMaterial> getRawMaterial() {
        return rawMaterial;
    }


    public void setRawMaterial(List<RawMaterial> rawMaterial) {
        this.rawMaterial = rawMaterial;
    }


//    @ManyToOne
//    private SalesDetails salesDetails;

}
