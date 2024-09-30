package com.shamima.SCMSystem.model.production;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

@Table(name = "distributor")
public class Distributor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "distributor_name")
    private String name;

    @Column(unique = true, name = "email")
    private String email;

    @Column(name = "phone")
    private String phone;

    @Column(name = "address_line")
    private String addressLine;


    @Column(name = "postal_code")
    private String postalCode;
}
