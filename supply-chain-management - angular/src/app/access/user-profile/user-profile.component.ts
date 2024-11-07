// src/app/components/user-profile/user-profile.component.ts

import { Component, OnInit } from '@angular/core';
import { UserModel } from "../userModel/user.model";
import { AuthService } from "../../authentication/auth.service";
import { Router } from "@angular/router";
import { privateDecrypt } from 'crypto';
import { UserprofileService } from '../user-profile.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'] // Corrected from 'styleUrl' to 'styleUrls'
})
export class UserProfileComponent implements OnInit {
  user!: UserModel;
  errorMessage: string = ''; // Property to store error messages

  constructor(
    private authService: AuthService,
    private router: Router,
    private userprofileService: UserprofileService

  ) { }

  ngOnInit(): void {
    this.loadUserProfile();
    console.log("Hello");
  }

  loadUserProfile(): void {
    this.userprofileService.getUserProfile()
      .subscribe({
        next: (user) => {
          if (user) {
            this.user = user;
            console.log("User Profile"+ user);


          }
        },
        error: error => {
          console.log('error user profile', error);
        }

      });
  }

  // Optional method to handle logout
  // logout(): void {
  //   this.authService.logout();
  //   this.router.navigate(['/login']); // Redirect to login page
  //}
}
