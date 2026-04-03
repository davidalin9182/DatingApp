import { HttpClient } from '@angular/common/http';
import { Account } from './_services/account';
import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, of } from 'rxjs';
import { Nav} from "./nav/nav";
import { User } from './_models/user';
import { Home } from "./home/home";


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Nav, Home],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  title = 'The Dating App';

  private http = inject(HttpClient);
  private accountService = inject(Account);


  users = signal<any[]>([]);
  errorMessage = signal('');
  loading = signal(false);


  ngOnInit() {
    //this.getUsers();
    this.setcurrentUser();
  }

/*   getUsers() {
    this.loading.set(true);

    this.http.get<any[]>('https://localhost:5001/api/users').subscribe({
      next: data => {
        this.users.set(data);
        this.loading.set(false);
      },
      error: err => {
        console.error('HTTP error:', err);
        this.errorMessage.set('Failed to load users');
        this.loading.set(false);
      },
      complete: () => console.log('Request complete')
    });
  } */

  setcurrentUser(){
    const user: User = JSON.parse(localStorage.getItem('user')!);
    this.accountService.setCurrentUser(user);
  }
}

