package com.shamima.SCMSystem.goods.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
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

    @Enumerated(EnumType.STRING)
    @Column(name = "unit")
    private Unit unit;


    private String image;
    
    @ManyToOne()
    @JoinColumn(name = "category_id")
    private RawMaterialCategory category;

    public enum Unit {
        LETTER,
        PIECE,
        KG,
        GRAM
    }
    
}
