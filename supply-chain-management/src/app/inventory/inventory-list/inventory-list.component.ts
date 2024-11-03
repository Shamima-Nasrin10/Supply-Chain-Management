import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../inventory.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inventory-list',
  templateUrl: './inventory-list.component.html',
  styleUrl: './inventory-list.component.css'
})
export class InventoryListComponent implements OnInit {

  inventories: any[] = [];

  constructor(
    private inventoryService: InventoryService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.inventoryService.getInventories().subscribe(data => {
      this.inventories = data;
    });
  }
  viewInventory(id: number) {
    this.router.navigate(['/inventoryDetail', id]);
  }



}
