import { Injectable } from '@angular/core';
import {AuthService} from "../authentication/auth.service";
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import {UserModel} from "./userModel/user.model";

@Injectable({
  providedIn: 'root'
})
export class UserprofileService {

  baseurl="http://localhost:3000/users";

  constructor(private authService:AuthService,
              private http:HttpClient
  ) { }

  getUserProfile(): Observable<UserModel | null> {
    console.log("Storage "+this.authService.getUserProfileFromStorage());
    return of(this.authService.getUserProfileFromStorage());

  }

  updateUserProfile(user: UserModel): Observable<UserModel> {
    localStorage.setItem('userProfile', JSON.stringify(user));
    return this.http.put<UserModel>(`${this.baseurl}/${user.id}`, user);
  }
}
