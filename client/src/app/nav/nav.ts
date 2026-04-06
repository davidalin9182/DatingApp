import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../_services/account';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { map, Observable } from 'rxjs';
import { User } from '../_models/user';
import { AsyncPipe, TitleCasePipe } from '@angular/common';
import { Router, RouterLink } from "@angular/router";
import { toast } from 'ngx-sonner';

@Component({
  selector: 'app-nav',
    standalone: true,
   imports: [FormsModule, NgbDropdownModule, AsyncPipe, RouterLink,TitleCasePipe],
  templateUrl: './nav.html',
  styleUrl: './nav.css'
  
})
export class Nav implements OnInit {
  model: any = {};
  public accountService = inject(AccountService);
  public router = inject(Router);

  constructor() { }
  
  ngOnInit(): void {

  }

  login() {
    this.accountService.login(this.model).subscribe({
      next: response => {
   
        this.router.navigateByUrl('/members');
      },
      error: err => {
        console.error('Login failed', err);
        toast.error(err.error); 
      }
    });
  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }


}
