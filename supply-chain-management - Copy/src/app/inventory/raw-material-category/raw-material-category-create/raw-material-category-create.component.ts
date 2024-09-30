import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifyUtil } from '../../../util/notify.util';
import { RawMaterialCategoryService } from '../raw-material-category.service';
import { RawMaterialCategory } from '../model/raw-material-category.model';


@Component({
  selector: 'app-raw-material-category-create',
  templateUrl: './raw-material-category-create.component.html',
  styleUrl: './raw-material-category-create.component.css'
})
export class RawMaterialCategoryCreateComponent {

  rawMaterialCategory: RawMaterialCategory = new RawMaterialCategory();
  rawMaterialCategoryId?: number;

  constructor(
    private rawMaterialCategoryService: RawMaterialCategoryService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.rawMaterialCategoryId = this.route.snapshot.params['id'];
    if (this.rawMaterialCategoryId) {
      this.loadRawMaterialCategory(this.rawMaterialCategoryId);
    }
  }

  private loadRawMaterialCategory(id: number) {
    this.rawMaterialCategoryService.findRawMaterialCategoryById(id).subscribe({
      next: response => {
        if (response && response.success) {
          this.rawMaterialCategory = response.data['category'];
        } else {
          NotifyUtil.error(response);
        }
      },
      error: error => {
        NotifyUtil.error(error);
      }
    });
  }

  onSubmit() {
    const rawMaterialCategoryObservable = this.rawMaterialCategoryId
      ? this.rawMaterialCategoryService.updateRawMaterialCategory(this.rawMaterialCategory)
      : this.rawMaterialCategoryService.saveRawMaterialCategory(this.rawMaterialCategory);

    rawMaterialCategoryObservable.subscribe({
      next: response => {
        if (response && response.success) {
          NotifyUtil.success(response);
          this.router.navigate(['/rawMaterialCategory-list']);
        } else {
          NotifyUtil.error(response);
        }
      },
      error: error => {
        NotifyUtil.error(error);
      }
    });
  }

}
