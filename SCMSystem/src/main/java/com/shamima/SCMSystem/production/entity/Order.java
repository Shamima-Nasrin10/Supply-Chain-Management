package com.shamima.SCMSystem.production.entity;

import com.shamima.SCMSystem.security.entity.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Date;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "prod_orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Temporal(TemporalType.DATE)
    @Column(name = "order_date", nullable = false)
    private Date orderDate;

    @Temporal(TemporalType.DATE)
    @Column(name = "expected_delivery_date")
    private Date expectedDeliveryDate;

    @Temporal(TemporalType.DATE)
    @Column(name = "shipping_address", nullable = false)
    private Date shippingAddress;

    @Enumerated(EnumType.STRING)
    @Column(name = "order_status", nullable = false)
    private OrderStatus orderStatus;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
    private List<OrderItem> orderItems;

    @ManyToOne
    @JoinColumn(name = "customer_id", nullable = false)
    private User customer;


    public enum OrderStatus {
        PENDING,
        APPROVED,
        REJECTED,
        COMPLETED
    }

}
