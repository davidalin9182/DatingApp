import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Account } from '../_services/account';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  @Output() cancelRegister = new EventEmitter<boolean>();

  private fb = inject(FormBuilder);
  private acc = inject(Account);
  registerForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(4)]]
  });


  constructor() {}

  register() {
    if (this.registerForm.invalid) return;
     this.acc.register(this.registerForm.getRawValue()).subscribe({
      next: response => {
        console.log(response);
        this.cancel();
      },
      error: error => {
        console.error(error);
      }
    });
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}
