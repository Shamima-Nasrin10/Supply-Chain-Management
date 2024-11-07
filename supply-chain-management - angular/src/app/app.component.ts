import { Component } from '@angular/core';
import {AuthService} from "./authentication/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  host: {ngSkipHydration: 'true'},
})
export class AppComponent {
  title = 'supply-chain-management';
  constructor(public authService: AuthService) {
  }
}
