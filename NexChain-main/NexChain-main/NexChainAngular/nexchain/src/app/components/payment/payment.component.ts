import { Component, OnInit } from '@angular/core';
import { Payment } from '../../model/payment.model';
import { PaymentService } from '../../service/payment.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent implements OnInit{

  paymentForm: FormGroup;
  payments: Payment[] = [];
  newPayment: Payment = new Payment();
  searchedPayment: Payment | undefined;
  searchForm: FormGroup;
  searchPerformed: boolean = false;


  constructor(private fb: FormBuilder, private paymentService: PaymentService) {
    this.paymentForm = this.fb.group({
      procurementId: ['', Validators.required],
      paymentAccount: ['', Validators.required],
      paymentAmount: ['', Validators.required],
      paymentDate: ['', Validators.required],

    });
    this.searchForm = this.fb.group({
      paymentId: ['', Validators.required]
    });

  }

  ngOnInit(): void {
    this.getAllPayments();
  }

  getAllPayments(): void {
    this.paymentService.getAllPayments().subscribe({
      next: (payments) => {
        this.payments = payments;
      },
      error: (error) => {
        console.error('Error fetching payments:', error);
      }
    });
  }

  addPayment(): void {
    if (this.paymentForm.valid) {
      const newPayment: Payment = this.paymentForm.value;
      this.paymentService.savePayment(newPayment).subscribe({
        next: (payment) => {
          console.log('Payment added successfully:', payment);
          this.getAllPayments();
          this.paymentForm.reset();
        },
        error: (error) => {
          console.error('Error adding payment:', error);
        }
      });
    }
  }

  deletePayment(paymentId: number | undefined): void {
    if (paymentId !== undefined) {
    this.paymentService.deletePayment(paymentId).subscribe({
      next: () => {
        console.log('Payment deleted successfully');
        this.getAllPayments();
      },
      error: (error) => {
        console.error('Error deleting payment:', error);
      }
    });
  }else{
    console.error('Payment Id is undefined')
  }
}

searchPayment(): void {
  this.searchPerformed = false;
  if (this.searchForm.valid) {
    const paymentId = this.searchForm.get('paymentId')?.value;
    this.paymentService.getPaymentById(paymentId).subscribe({
      next: (payment) => {
        this.searchedPayment = payment;
        this.searchPerformed = true;
        console.log('Searched Payment:', this.searchedPayment);
      },
      error: (error) => {
        console.error('Error searching payment by ID:', error);
        this.searchedPayment = undefined;
        this.searchPerformed = true;
      }
    });
  } else {
    console.error('Invalid form');
  }
}

}
