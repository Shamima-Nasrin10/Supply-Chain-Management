import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Stock } from '../../model/stock.model';
import { InventoryService } from '../../service/inventory.service';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrl: './stock.component.css'
})
export class StockComponent implements OnInit{

  stockForm!: FormGroup;
  stockList!: Stock[];

  constructor(private formBuilder: FormBuilder, private inventoryService: InventoryService) { }

  ngOnInit(): void {
    this.stockForm = this.formBuilder.group({
      rawMaterial: [''],
      previousPrice: [''],
      unitPrice: [''],
      quantity: [''],
      lastStockUpdateDate: [''],
      increase: [''],
      decrease: ['']
    });

    this.loadStockDetails();
  }

  loadStockDetails() {
    this.inventoryService.getStockDetails().subscribe(data => {
      this.stockList = data;
    });
  }


  public print(): void {
    const content = document.getElementById('content');
    if (content) {
      window.print();
    } else {
      console.error('Content element not found.');
    }
  }

}
