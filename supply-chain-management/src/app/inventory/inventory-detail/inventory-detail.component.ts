import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InventoryService } from '../inventory.service';

@Component({
  selector: 'app-inventory-detail',
  templateUrl: './inventory-detail.component.html',
  styleUrl: './inventory-detail.component.css'
})
export class InventoryDetailComponent implements OnInit {

  inventory: any;

  constructor(
    private route: ActivatedRoute,
    private inventoryService: InventoryService
  ) { }
  
  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.inventoryService.getInventoryById(id).subscribe(data => {
      this.inventory = data;
    });
  }

}
