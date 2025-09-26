import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  title = 'The Dating App';

  private http = inject(HttpClient);

  // Signals for state management
  users = signal<any[]>([]);
  errorMessage = signal('');
  loading = signal(false);

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
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
  }
}

