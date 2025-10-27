import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { Auth } from '../../core/service/auth-services';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, CommonModule], // Add CommonModule here
  templateUrl: './header.html',
  styleUrl: './header.css'
})

export class Header implements OnInit{
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
