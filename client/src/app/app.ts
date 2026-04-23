import { HttpClient } from '@angular/common/http';
import { AccountService } from './_services/account';
import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, of } from 'rxjs';
import { Nav} from "./nav/nav";
import { User } from './_models/user';
import { Home } from "./home/home";
import { NgxSonnerToaster, toast } from 'ngx-sonner';
import { environment } from '../environments/environment.development';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Nav, Home, NgxSonnerToaster],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  title = 'The Dating App';

  private http = inject(HttpClient);
  private accountService = inject(AccountService);


  users = signal<any[]>([]);
  errorMessage = signal('');
  loading = signal(false);


  ngOnInit() {
    
    this.setCurrentUser();
  }



  setCurrentUser() {
    const userString = localStorage.getItem('user');

    if (!userString) {
      this.accountService.setCurrentUser(null);
      return;
    }

    const user: User = JSON.parse(userString);
    this.accountService.setCurrentUser(user);
  }
}

