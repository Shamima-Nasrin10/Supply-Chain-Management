
import { Component, OnInit } from '@angular/core';
import { OrderModel } from '../model/order.model';
import { OrderService } from '../order.service';
import { OrderStage, ManufacturingStage } from '../model/enum/enums';
import { AuthService } from '../../authentication/auth.service';
import { Role } from '../../access/userModel/user.model';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  // orders: OrderModel[] = [];
  // isAdmin: boolean = false;
  // status = OrderStage;
  // manufacturingStages = Object.values(ManufacturingStage);

  constructor(
    // private orderService: OrderService,
    // private authService:AuthService,
    // private productService:ProductService

  ) {}

  ngOnInit(): void {
    // this.checkAdminRole();
    // this.getOrders();
  }

  // checkAdminRole(): void {
  //   const currentUser = this.authService.getUserProfileFromStorage();
  //   if (currentUser && currentUser.role === Role.ADMIN) {
  //     this.isAdmin = true;
  //   } else {
  //     this.isAdmin = false;
  //   }
  // }
  //
  // getOrders(): void {
  //   this.orderService.getOrders().subscribe({
  //     next: (orders) => {
  //       if (this.isAdmin) {
  //         this.orders = orders;
  //         console.log(this.orders)
  //       } else {
  //         const currentUser = this.authService.getUserProfileFromStorage();
  //         this.orders = orders.filter(order => order.userId === currentUser?.id);
  //       }
  //     },
  //     error: (err) => {
  //       console.error('Error fetching orders:', err);
  //
  //     }
  //   });
  // }
  //
  // approveOrder(order: OrderModel): void {
  //   if (this.isAdmin) {
  //     const product = order.product as ProductModel;
  //     const newStock = product.stock - order.quantity;
  //
  //     if (newStock >= 0) {
  //       // Update the product stock
  //       this.productService.updateProductStock(product.id, newStock).subscribe({
  //         next: () => {
  //           // Approve the order after stock update
  //           this.orderService.approveOrder(order.id).subscribe({
  //             next: (updatedOrder) => {
  //               order.status = updatedOrder.status;
  //               console.log('Order approved and stock updated:', updatedOrder);
  //             },
  //             error: (err) => {
  //               console.error('Error approving order:', err);
  //             }
  //           });
  //         },
  //         error: (err) => {
  //           console.error('Error updating product stock:', err);
  //         }
  //       });
  //     } else {
  //       console.warn('Not enough stock to approve the order.');
  //     }
  //   } else {
  //     console.warn('Only admins can approve orders.');
  //   }
  // }
  //
  // rejectOrder(order: OrderModel): void {
  //   if (this.isAdmin) {
  //     this.orderService.rejectOrder(order.id).subscribe({
  //       next: (updatedOrder) => {
  //         order.status = updatedOrder.status;
  //
  //       },
  //       error: (err) => {
  //         console.error('Error rejecting order:', err);
  //
  //       }
  //     });
  //   } else {
  //
  //     console.warn('Only admins can reject orders.');
  //   }
  // }
  //
  // updateManufacturingStage(order: OrderModel): void {
  //   if (this.isAdmin) {
  //     this.orderService.updateManufacturingStage(order.id, order.manufacturingStage!).subscribe({
  //       next: (updatedOrder) => {
  //         order.manufacturingStage = updatedOrder.manufacturingStage;
  //
  //       },
  //       error: (err) => {
  //         console.error('Error updating manufacturing stage:', err);
  //
  //       }
  //     });
  //   } else {
  //
  //     console.warn('Only admins can update the manufacturing stage.');
  //   }
  // }
}
