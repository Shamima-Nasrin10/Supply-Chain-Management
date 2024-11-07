import { Component, OnInit } from '@angular/core';
import { OrderModel } from '../../order/model/order.model';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ProductService } from '../../product/product.service';
import { OrderService } from '../../order/order.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css'] // Fixed typo: changed 'styleUrl' to 'styleUrls'
})
export class InvoiceComponent implements OnInit {
  orders: any;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const orderData = params['orders'];
      if (orderData) {
     console.log('Order data:', this.orders);
      } else {
        console.error('No order data found');
      }
    });
  }
}
