package com.shamima.SCMSystem.accounting.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.shamima.SCMSystem.production.entity.Product;
import com.shamima.SCMSystem.production.entity.Distributor;
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
@Table(name = "acc_sales")
public class Sales {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne
    @JoinColumn(name = "retailer_id")
    private Distributor retailer;
    private Date salesdate;
    private int totalprice;

    private int quantity;
    private float discount;


    @JsonIgnore
    @ManyToMany
    private List<Product> product=new ArrayList<>();

    public List<Product> getProduct(){
        return product;
    }


    public void setProduct(List<Product> product) {
        this.product = product;
    }


//    @ManyToOne
//    private SalesDetails salesDetails;

}
