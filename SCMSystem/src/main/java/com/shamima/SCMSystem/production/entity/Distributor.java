package com.shamima.SCMSystem.production.entity;

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
@Table(name = "retailers")
public class Distributor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "first_name")
    private String firstName;


    @Column(name = "last_name")
    private String lastName;


    @Column(unique = true, name = "email")
    private String email;

    @Column(name = "phone")
    private String phone;

    @Column(name = "address_line")
    private String addressLine;


    @Column(name = "postal_code")
    private String postalCode;

//    @ManyToOne
//    @JoinColumn(name = "country_id", nullable = false)
//    private Country country;
//
//    @ManyToOne
//    @JoinColumn(name = "city_id", nullable = false)
//    private City city;
    
}
