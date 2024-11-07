import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserModel } from '../userModel/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  private baseUrl='http://localhost:3000/users';
  constructor(
    private http:HttpClient
  ) { }

registerUser(user: UserModel): Observable<UserModel>{
  // user.role='Pending';
  return this.http.post<UserModel>(this.baseUrl, user);
}

}
