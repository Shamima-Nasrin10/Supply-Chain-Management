package com.shamima.SCMSystem.model.account;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.shamima.SCMSystem.model.production.Distributor;
import com.shamima.SCMSystem.model.production.Product;
import jakarta.persistence.*;

import java.sql.Date;
import java.util.List;

public class Sales {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne
    @JoinColumn(name = "retailer_id")
    private Distributor distributor;
    private Date salesdate;
    private double totalprice;

    private int quantity;
    private float discount;

    @JsonIgnore
    @ManyToMany
    private List<Product> product;
}
