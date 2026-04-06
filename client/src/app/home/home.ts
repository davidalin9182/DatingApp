import { Component, inject, OnInit } from '@angular/core';
import { Register } from "../register/register";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Register],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  registerMode = false;


  ngOnInit(): void {
  
  }

  registerToggle() {
    this.registerMode = !this.registerMode;
  }
  setRegisterToggle(registerMode: boolean) {
    this.registerMode = registerMode;
  }

}
