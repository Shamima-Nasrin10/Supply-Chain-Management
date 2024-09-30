import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from "../authentication/auth.service";
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class RoleGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  // canActivate(
  //   route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot
  // ): Observable<boolean> | Promise<boolean> | boolean {
  //   return this.authService.currentUser$.pipe(
  //     map(user => {
  //       if (!user || !user['role']) {  // Ensure 'role' is defined
  //         this.router.navigate(['/login']);
  //         return false;
  //       }

  //       const userRole = user['role'];  // Get the user's role
  //       const requiredRoles: string[] = route.data['roles'];  // Expected roles from route data

  //       if (!requiredRoles || requiredRoles.length === 0) {
  //         return true; // If no specific roles are required, allow access
  //       }

  //       // Check if the user's role is among the required roles
  //       if (requiredRoles.includes(userRole)) {
  //         return true;
  //       } else {
  //         this.router.navigate(['/access-denied']); // Redirect to an access denied page or some other handling
  //         return false;
  //       }
  //     })
  //   );
  // }


  //   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

  //     if (this.authService.isAuthenticated()) {

  //       const expectedRole = route.data['expectedRole'];

  //       const currentRole = this.authService.getUserRole();

  //       console.log('Expected Role:', expectedRole);
  //       console.log('Current Role:', currentRole);


  //       if (currentRole === expectedRole) {
  //         return true;
  //       } else {

  //         this.router.navigate(['/unauthorized']);
  //         return false;
  //       }
  //     } else {
  //       this.router.navigate(['/login']);
  //       return false;
  //     }
  //   }
  // }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const expectedRoles = route.data['roles'] as Array<string>;
    const currentRole = this.authService.getUserRole();
    if (currentRole && expectedRoles.includes(currentRole)) {
      return true;
    } else {
      this.authService.logout();
      this.router.navigate(['/login']);
      return false;
    }
  }

}
