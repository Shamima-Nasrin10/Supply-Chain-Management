package com.shamima.SCMSystem.production.service;

import com.shamima.SCMSystem.goods.entity.RawMaterial;
import com.shamima.SCMSystem.production.entity.Order;
import com.shamima.SCMSystem.production.repository.OrderRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;
    @Transactional
    public void createOrder() {
        // create order
    }

//    @Transactional
//    public void updateOrder(Order order, List<RawMaterial> rawMaterials) {
//        if (order.getStage().equals(Order.ManufacturingStage.CUTTING)) {
//            if (rawMaterials.isEmpty()) {
//                // return error
//            } else {
//                for (RawMaterial rawMaterial : rawMaterials) {
//                    // RawMaterial dbRawMaterial = rawMaterialRepository.getById(rawMaterial.getId());
//                    // dbRawMaterial.setQuantity(dbRawMaterial.getQuantity() - rawMaterial.getQuantity());
//                    // rawMaterialRepository.save(dbRawMaterial);
//                }
//            }
//        } else if (order.getStage().equals(Order.ManufacturingStage.WAREHOUSE)) {
//            // for (OrderItem orderItem : order.getOrderItems()) {
//            //     Product dbProduct = productRepository.getById(orderItem.getProduct().getId());
//            //     dbProduct.setQuantity(dbProduct.getQuantity() + orderItem.getQuantity());
//            //     productRepository.save(dbProduct);
//            // }
//
//        } else if (order.getStage().equals(Order.ManufacturingStage.SHIPPED)) {
//            // for (OrderItem orderItem : order.getOrderItems()) {
//            //     Product dbProduct = productRepository.getById(orderItem.getProduct().getId());
//            //     dbProduct.setQuantity(dbProduct.getQuantity() - orderItem.getQuantity());
//            //     productRepository.save(dbProduct);
//            // }
//        }
//        // orderRepository.save(order);
//    }

    @Transactional
    public void deleteOrder() {
        // delete order
    }

    @Transactional
    public void getOrder() {
        // get order
    }

    @Transactional
    public void getAllOrders() {
        // get all orders
    }

    @Transactional
    public void getOrderItems() {
        // get order items
    }

    @Transactional
    public void addOrderItem() {
        // add order item
    }

    @Transactional
    public void updateOrderItem() {
        // update order item
    }

    @Transactional
    public void deleteOrderItem() {
        // delete order item
    }

    @Transactional
    public void getOrdersByUser() {
        // get orders by user
    }

    @Transactional
    public void getOrdersByStatus() {
        // get orders by status
    }

    @Transactional
    public void getOrdersByDate() {
        // get orders by date
    }

}
