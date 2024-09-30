import { Component } from '@angular/core';
import { AuthService } from '../../../authentication/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserModel } from '../../userModel/user.model';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent {

  regForm!: FormGroup;
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.regForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }
  get f(){return this.regForm.controls;}

  onSubmit(): void {
    // if (this.regForm.valid) {
    //   const user: UserModel = this.regForm.value;

    //   // Check if email already exists
    //   this.authService.checkEmailExists(user.email).subscribe({
    //     next: (exists) => {
    //       if (exists) {
    //         this.errorMessage = 'Email is already registered. Please log in.';
    //         //this.router.navigate(['/login']); // Redirect to login page if email exists
    //       } else {
    //         user.role = 'Pending'; // Set default role to 'pending'
    //         this.authService.registration(user).subscribe({
    //           next: (res) => {
    //             console.log('User registered successfully:', res);
    //             // Redirect to login page with a message
    //             this.errorMessage = 'Registration successful. Please wait for admin approval before logging in.';
    //             this.router.navigate(['/login']);
    //           },
    //           error: (err) => {
    //             console.error('Error registering user:', err);
    //             this.errorMessage = 'Registration failed. Please try again later.';
    //           }
    //         });
    //       }
    //     },
    //     error: (error) => {
    //       console.error('Error checking email:', error);
    //       this.errorMessage = 'Unable to check email. Please try again later.';
    //     }
    //   });
    // } else {
    //   this.errorMessage = 'Complete all mandatory fields.';
    // }
  }

}
