import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Account } from '../_services/account';
//import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-nav',
   imports: [FormsModule,/* NgbDropdownModule */ ],
  templateUrl: './nav.html',
  styleUrl: './nav.css'
})
export class Nav implements OnInit {
  model: any = {};
  loggedIn: boolean = false;

  constructor(private accountService: Account) { }

  ngOnInit(): void {
    this.getCurrentUser();
  }

  login() {
    this.accountService.login(this.model).subscribe({
      next: response => {
        this.loggedIn = true;
        console.log('Login successful', response);
      },
      error: err => {
        console.error('Login failed', err);
      }
    });
  }

  logout() {
    this.accountService.logout();
    this.loggedIn = false;
    console.log('Logged out');
  }

  getCurrentUser() {
    this.accountService.currentUser$.subscribe(user => {
      this.loggedIn = !!user;
    }, error => {
      console.error('Error fetching current user', error);
    });
  }
}
