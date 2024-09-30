import { Component } from '@angular/core';
import { RawMaterialCategory } from '../model/raw-material-category.model';
import { RawMaterialCategoryService } from '../raw-material-category.service';
import { ApiResponse } from '../../../util/api.response';
import { NotifyUtil } from '../../../util/notify.util';

@Component({
  selector: 'app-raw-material-category-list',
  templateUrl: './raw-material-category-list.component.html',
  styleUrl: './raw-material-category-list.component.css'
})
export class RawMaterialCategoryListComponent {

  categories: RawMaterialCategory[] = [];

  constructor(private rawMaterialCategoryService: RawMaterialCategoryService) { }

  ngOnInit(): void {
    this.loadRawMaterialCategories();
  }


  private loadRawMaterialCategories(): void {
    this.rawMaterialCategoryService.getAllRawMaterialCategories().subscribe({
      next: (response: ApiResponse) => {
        if (response && response.success) {
          this.categories = response.data['categories'];
        } else {
          NotifyUtil.error(response);
        }
      },
      error: (error) => {
        NotifyUtil.error(error);
      }
    });
  }


  deleteCategory(id: number): void {
    if (confirm('Are you sure you want to delete this category?')) {
      this.rawMaterialCategoryService.deleteRawMaterialCategoryById(id).subscribe({
        next: (response: ApiResponse) => {
          if (response && response.success) {
            NotifyUtil.success(response);
          } else {
            NotifyUtil.error(response);
          }
          this.loadRawMaterialCategories();
        },
        error: (error) => {
          NotifyUtil.error(error);
        }
      });
    }
  }
}
