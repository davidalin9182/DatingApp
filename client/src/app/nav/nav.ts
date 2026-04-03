import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Account } from '../_services/account';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { User } from '../_models/user';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-nav',
   imports: [FormsModule, NgbDropdownModule,AsyncPipe],
  templateUrl: './nav.html',
  styleUrl: './nav.css'
})
export class Nav implements OnInit {
  model: any = {};

  constructor(public accountService: Account) { }

  ngOnInit(): void {

  }

  login() {
    this.accountService.login(this.model).subscribe({
      next: response => {
   
        console.log('Login successful', response);
      },
      error: err => {
        console.error('Login failed', err);
      }
    });
  }

  logout() {
    this.accountService.logout();
    console.log('Logged out');
  }


}
