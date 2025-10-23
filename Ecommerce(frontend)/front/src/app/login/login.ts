import { Component, Injectable } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Auth } from '../core/service/auth-services';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  constructor(private authServices: Auth){}
Loginform:FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
}
)
login(){
  this.authServices.login(this.Loginform.value).subscribe(
    data=>{
      console.log(data);
      
    }
  ) ;
  
}}
