import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Auth } from '../core/service/auth-services';
import { INewUser } from '../models/auth.model';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Route, Router } from '@angular/router';


@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './signup.html',
  styleUrl: './signup.css'
})
export class Signup{
constructor(private _authServices:Auth, private _http:HttpClient, private router:Router){}
signupform:FormGroup = new FormGroup({
  name:new FormControl(''),
  email: new FormControl(''),
  password: new FormControl('')
});
// ngOnInit(): void{
  signup(){
  let newUser:INewUser = {
  name : this.signupform.value.name,
  email : this.signupform.value.email,
  password : this.signupform.value.password
  }
  //subscribe 3shan ysm3 new user fe db
  this._authServices.signup(newUser).subscribe({
    next:(res)=>{
      console.log( res);
      this.signupform.reset();
      this.router.navigate(['/login'])
    },
    error:(err)=>{
      console.log(err);
    }
  })

  console.log((newUser));
  
}
// }

}




