import { Component } from '@angular/core';
import { AuthService } from "../../../authentication/auth.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] // Corrected 'styleUrl' to 'styleUrls'
})
export class LoginComponent {

  loginForm!: FormGroup;
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const credentials = this.loginForm.value;
      this.authService.login(credentials.email, credentials.password).subscribe({
        next: (res) => {
          console.log('User logged in successfully:', res);

          const role = this.authService.getUserRole();
          console.log(role);
          if (role === 'ADMIN') {
            console.log("Role from Login Page "+role)
            window.location.href = 'rawMaterial-list';
          } else if (role === 'USER') {
            console.log("Role from Login Page "+role)
            this.router.navigate(['/userprofile']); 
          } else {
            this.errorMessage = 'Your account is pending approval. Please contact an admin.';
          }
        },
        error: (error) => {
          console.error('Error logging in:', error);
          this.errorMessage = 'Invalid credentials. Please try again.';
        }
      });
    } else {
      this.errorMessage = 'Please fill out all required fields.';
    }
  }
}
