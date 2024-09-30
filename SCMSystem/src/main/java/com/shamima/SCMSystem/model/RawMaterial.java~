package com.shamima.SCMSystem.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RawMaterial {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "material_id")
//    @JsonProperty("materialId")

    private Long materialID;

    @Column(name = "material_name")
    private String materialName;

    @Column(name = "material_type")
    private String materialType;


    @JsonIgnore
    @OneToMany(mappedBy = "rawMaterial")
    private List<Inventory> inventories;
}
