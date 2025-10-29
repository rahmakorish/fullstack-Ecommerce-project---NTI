import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { Header } from '../layout/header/header';
import { Auth } from '../core/service/auth-services';

@Component({
  selector: 'app-dashboard',
  imports: [RouterOutlet, RouterLink, CommonModule], // Add CommonModule here
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit{
isloggedin = false;
name:string|null=''
constructor(private _authServices:Auth){}
ngOnInit(): void {
  //on initiating the function get the loggedin user name via subscribing to observable 
this._authServices.getAuthName().subscribe(data=>{
  if(data){
    this.name = data;
    this.isloggedin= true;
  }
  else{
    this.name = '';
    this.isloggedin= false;
  }
})
}

logout(){this._authServices.logout();}
}
