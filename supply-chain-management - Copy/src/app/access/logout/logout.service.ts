import {Injectable, OnInit} from '@angular/core';
import {AuthService} from "../../authentication/auth.service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class LogoutService implements OnInit{

  constructor(
    private authService:AuthService,
    private router:Router
  ){}
  ngOnInit(): void {
    this.logout();
  }

  logout(){
    this.authService.logout();
    // this.authService.removeUserDetails();
    this.router.navigate(['login']);

  }
}
