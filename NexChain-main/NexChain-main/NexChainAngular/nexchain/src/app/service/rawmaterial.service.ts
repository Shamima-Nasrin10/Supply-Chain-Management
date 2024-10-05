import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RawMaterial } from '../model/rawmaterial.model';

@Injectable({
  providedIn: 'root'
})
export class RawmaterialService {

  private baseUrl = 'http://localhost:8084/api/rawmaterials';

  constructor(private http: HttpClient) { }

  getAllRawMaterials(): Observable<RawMaterial[]>{
    return this.http.get<RawMaterial[]>(this.baseUrl);
  }

  addRawMaterial(rawmaterial: RawMaterial): Observable<RawMaterial>{
    return this.http.post<RawMaterial>(this.baseUrl, rawmaterial);
  }

  updateRawMaterial(id: number, rawmaterial: RawMaterial): Observable<RawMaterial>{
    const url= `${this.baseUrl}/${id}`;
    return this.http.put<RawMaterial>(url, rawmaterial);
  }

  deleteRawMaterial(id: number): Observable<void>{
    const url =`${this.baseUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}
