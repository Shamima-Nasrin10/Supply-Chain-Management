import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../util/api.response';
import { RawMaterialCategory } from './model/raw-material-category.model';

@Injectable({
  providedIn: 'root'
})
export class RawMaterialCategoryService {

  private apiUrl = 'http://localhost:8080/api/rawmaterialcategory';

  constructor(private http: HttpClient) { }

  getAllRawMaterialCategories(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.apiUrl}/list`);
  }

  saveRawMaterialCategory(rawMaterialCategory: RawMaterialCategory): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.apiUrl}/save`, rawMaterialCategory);
  }

  updateRawMaterialCategory(rawMaterialCategory: RawMaterialCategory): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(`${this.apiUrl}/update`, rawMaterialCategory);
  }

  deleteRawMaterialCategoryById(id: number): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(`${this.apiUrl}/delete/${id}`);
  }

  findRawMaterialCategoryById(id: number): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.apiUrl}/${id}`);
  }

}
