import { Component, OnInit } from '@angular/core';
import { ProductWareHouse } from '../../model/product-warehouse.model';
import { ProductWarehouseService } from '../../service/product-warehouse.service';

@Component({
  selector: 'app-warehouse-status',
  templateUrl: './warehouse-status.component.html',
  styleUrl: './warehouse-status.component.css'
})
export class WarehouseStatusComponent implements OnInit{

  wareDetails: ProductWareHouse[]=[];

  constructor(private productService: ProductWarehouseService) { }

  ngOnInit(): void {
    this.getAllWareDetails();
  }

  getAllWareDetails(): void {
    this.productService.getAllWareDetails().subscribe(
      (data: ProductWareHouse[]) => {
        this.wareDetails = data;
      },
      (error) => {
        console.error('Error fetching warehouse details:', error);
      }
    );
  }
}
