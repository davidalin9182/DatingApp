import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { AccountService } from '../_services/account';
import { toast } from 'ngx-sonner';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  @Output() cancelRegister = new EventEmitter<boolean>();

  private fb = inject(FormBuilder);
  private acc = inject(AccountService);
  registerForm = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(4)]],
    password: ['', [Validators.required, Validators.minLength(4)]]
  });


  constructor() {}

  register() {
   // if (this.registerForm.invalid) return;
     this.acc.register(this.registerForm.getRawValue()).subscribe({
      next: response => {
        console.log(response);
        this.cancel();
      },
      error: error => {
        console.error(error);
        toast.error(error.error);
      }
    });
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}
