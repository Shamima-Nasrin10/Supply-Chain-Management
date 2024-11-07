import { CanActivate, CanActivateFn, Router } from '@angular/router';
import {AuthService} from "../authentication/auth.service";
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})


export class AuthGuard implements CanActivate{
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      return true;
    } else {
      this.authService.logout();
      this.router.navigate(['/login']);
      return false;
    }
  }


};
