// import { Component, OnInit } from '@angular/core';
// import { UserModel } from '../../access/userModel/user.model';
// import { AuthService } from '../../authentication/auth.service';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// @Component({
//   selector: 'app-admin',
//   templateUrl: './admin.component.html',
//   styleUrl: './admin.component.css'
// })
// export class AdminComponent implements OnInit {

//   users: UserModel[] = [];
//   selectedUser: UserModel | null = null;
//   editForm: FormGroup;
//   errorMessage: string = '';
//   successMessage: string = '';

//   constructor(
//     private authService: AuthService,
//     private formBuilder: FormBuilder
//   ) {
//     // Initialize the form
//     this.editForm = this.formBuilder.group({
//       name: ['', Validators.required],
//       email: ['', [Validators.required, Validators.email]],
//       role: ['', Validators.required]
//     });
//   }
//   ngOnInit(): void {
//     this.loadUsers();
//   }

//   loadUsers(): void {
//     this.authService.getAllUsers()
//       .subscribe({
//         next: (users) => {
//           this.users = users;
//         },
//         error: (error) => {
//           this.errorMessage = 'Error loading users. Please try again later.';
//           console.error('Error loading users:', error);
//         }
//       });
//   }

//   editUser(user: UserModel): void {
//     this.selectedUser = user;
//     this.editForm.patchValue(user); 
//   }

//   updateUser(): void {
//     if (this.editForm.valid && this.selectedUser) {
//       const updatedUser = { ...this.selectedUser, ...this.editForm.value };
//       this.authService.updateUserRole(updatedUser.id, updatedUser.role).subscribe({
//         next: () => {
//           this.successMessage = `User ${updatedUser.name} updated and approved successfully.`;
//           this.loadUsers(); // Refresh user list
//           this.cancelEdit(); // Reset edit form
//         },
//         error: (error) => {
//           this.errorMessage = `Error updating user ${updatedUser.name}. Please try again.`;
//           console.error('Error updating user:', error);
//         }
//       });
//     }
//   }

//   cancelEdit(): void {
//     this.selectedUser = null; 
//     this.editForm.reset();
//   }

//   deleteUser(user: UserModel): void {
//     this.authService.deleteUser(user).subscribe({
//       next: () => {
//         this.successMessage = `User ${user.name} deleted successfully.`;
//         this.loadUsers();
//       },
//       error: (error) => {
//         this.errorMessage = `Error deleting user ${user.name}. Please try again.`;
//         console.error('Error deleting user:', error);
//       }
//     });
//   }


// }
