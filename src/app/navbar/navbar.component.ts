import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../Services/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  loggedIn: boolean = false;
  constructor(private authService: AuthenticationService) {}

  ngOnInit(): void {
    this.getCurrentUser();
  }

  logout() {
    this.authService.logout();
    this.loggedIn = false;
  }

  getCurrentUser() {
    this.authService.currentUser.subscribe({
      next: (user) => {
        // console.log(user.email);
        // console.log(this.loggedIn);

        if (user.email) {
          this.loggedIn = true;
        }
      },
      error: (error) => {
        console.log(error.error);
      },
    });
  }
}
