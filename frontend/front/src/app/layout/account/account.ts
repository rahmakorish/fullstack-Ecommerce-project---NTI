import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AccountService } from '../../core/service/account-service';
import { HttpClient } from '@angular/common/http';
import { IUserData } from '../../models/user.model';
import { CommonModule } from '@angular/common';
import { Order } from "../order/order";

@Component({
  selector: 'app-account',
    standalone: true,          
  imports: [CommonModule, Order],
  templateUrl: './account.html',
  styleUrl: './account.css'
})
export class Account implements OnInit{
constructor(private _accountServices:AccountService, private _http:HttpClient,
  private cdr:ChangeDetectorRef){}
userData:IUserData[]=[];
user!:IUserData;
  ngOnInit(): void {
    //get user data
    this._accountServices.displayData()?.subscribe({
      next:data=>{
        // console.log(data)
        this.userData = data;
        console.log(this.userData);
        
      this.cdr.detectChanges()
},
      error:err=>console.log(err.message)
      
    })
  }

}
