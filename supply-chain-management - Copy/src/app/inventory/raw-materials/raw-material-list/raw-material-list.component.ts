import { Component, OnInit } from '@angular/core';
import { RawMaterial } from '../model/raw-material.model';
import { RawMaterialService } from '../raw-material.service';
import { Router } from '@angular/router';
import { response } from 'express';
import { error } from 'console';
import { SupplierModel } from '../../suppliers/model/supplier.model';
import { SupplierService } from '../../suppliers/supplier.service';
import {AlertService} from "../../../util/alert.service";
import { ApiResponse } from '../../../util/api.response';
import { NotifyUtil } from '../../../util/notify.util';

@Component({
  selector: 'app-raw-material-list',
  templateUrl: './raw-material-list.component.html',
  styleUrl: './raw-material-list.component.css'
})
export class RawMaterialListComponent implements OnInit {

  rawMaterials: RawMaterial[] = [];

  constructor(
    private rawmaterialService: RawMaterialService
  ) { }

  ngOnInit(): void {
    this.loadRawMaterials();
  }

  loadRawMaterials(): void {
    this.rawmaterialService.getAllRawMaterials().subscribe({
      next: response => {
        if (response && response.success) {
          this.rawMaterials = response.data['rawMaterials'];
        } else {
          NotifyUtil.error(response);
        }
      },
      error: error => {
        NotifyUtil.error(error);
      }
    });
  }

  deleteRawMaterial(id: number): void {
    if (confirm('Are you sure you want to delete this raw material?')) {
      this.rawmaterialService.deleteRawMaterialById(id).subscribe({
        next: (response: ApiResponse) => {
          if (response && response.success) {
            NotifyUtil.success(response);
          } else {
            NotifyUtil.error(response);
          }
          this.loadRawMaterials(); 
        },
        error: (error) => {
          NotifyUtil.error(error);
        }
      });
    }
  }

}
