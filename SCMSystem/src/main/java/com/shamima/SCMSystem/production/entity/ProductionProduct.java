package com.shamima.SCMSystem.production.entity;

import com.shamima.SCMSystem.products.entity.Product;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "production_product")
public class ProductionProduct {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product; //from angular send class only containing product.id

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    private List<RawMatUsage> rawMatUsages;

}
