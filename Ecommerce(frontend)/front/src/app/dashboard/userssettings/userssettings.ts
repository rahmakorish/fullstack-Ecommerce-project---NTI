import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AccountService } from '../../core/service/account-service';
import { HttpClient } from '@angular/common/http';
import { IUserData } from '../../models/user.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-userssettings',
  imports: [CommonModule],
  templateUrl: './userssettings.html',
  styleUrl: './userssettings.css'
})
export class Userssettings implements OnInit {
constructor(private _accountServices:AccountService, private _http:HttpClient, 
private cdr:ChangeDetectorRef){}
  adminData!: IUserData;
  usersData: IUserData[] = [];
  ngOnInit(): void {
    //create new admin 
// this._accountServices.createadmin(this.adminData).subscribe({
//     next:res=>{
//         console.log(res);
        
//       },
//       error:err=>console.log(err.message)
// })

//get all users info :v ءالقوة
    this._accountServices.getUsersInfo()?.subscribe({
      next:data=>{
        this.usersData = data;
        console.log(data);
        this.cdr.detectChanges()
      },
      error:err=>console.log(err.message)
      
    })

  }

}
