import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';
import { enviroment } from '../../../../enviroments/enviroment';
import {  IAuthresponse, ICredintials, INewUser, ITokenDecode } from '../../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class Auth {
constructor( private _http:HttpClient, private _router:Router){}
//observable that conatin the cureent user name if user logged in 
//preserves the latest value only a special type of good observable 
private authName = new BehaviorSubject<string | null>(null)
//return public observerable because the original observable is private
getAuthName(){return this.authName.asObservable()}
isloggedin(){
  const token = this.getToken();
  if(token){
        if(this.isValidtoken(token)){
        this.authName.next(this.decodeToken(token).name)
        }
        else{
              this.authName.next(null);
              //delete token from local storage whe nuser is not logged
              this.logout()
        }

  }
  else{
    this.authName.next(null)
  }
}
// check token expiry date :
private isValidtoken(token:string){
  try{  
    //decode token to find expiry date
    const decode = this.decodeToken(token);
    const expiryDate = decode.exp *1000;
    // console.log('exp:', expiryDate);
    // console.log('date now:', Date.now());
    return Date.now() < expiryDate;
}
  catch(err){
    return false;
  }
}


apiUrl = enviroment.apiURL+'auth'
signupURL = enviroment.apiURL+'user/signup'

signup(newUSer:INewUser){
  return this._http.post<INewUser>(this.signupURL, newUSer)
  // return(newUSer);
  
}

login(credintials:ICredintials){
  //we need to get the user token to authorize access to dashboard
    return this._http.post<IAuthresponse>(this.apiUrl+'/login', credintials).pipe(
      tap(res=>{
        this.StoreToken(res.data)
        //take username at login //next adds data to observable 
        this.authName.next(this.decodeToken(res.data).name)
        //navigate to dashboard if admin 
        if(this.decodeToken(res.data).role === 'admin'){
          this._router.navigate(['dashboard'])
        }
        else{
          this._router.navigate(['/'])
        }
      })
    )
  }
  //puplic general key of token for the 2 functions related to send aND GET TOKEN 
  private token_key = 'token'
  // a function to store data 
  private StoreToken(token:string){
    localStorage.setItem(this.token_key, token)
  }
//returns either string of token or null if no token 
  getToken():string | null{
    return localStorage.getItem(this.token_key)
  }
//decode the given token 
//returns the public and decoded part of the token 
private decodeToken(token:string){
  const decode = jwtDecode<ITokenDecode>(token)
  return (decode);
  
}
//check role of logged in user
isloggedinWithRole(role:string){
  //check if there's token
const token = this.getToken();
if(token){
  //valid token? 
  if(this.isValidtoken(token)){
    const decodedRole = this.decodeToken(token).role;
    if(role === decodedRole){ return true;}
    else{ return false }
  }
return false;
}
  else{ return false}

}
//on logout remove token and turn name into null and navigate out of layout 
logout(){
  localStorage.removeItem(this.token_key)
  this.authName.next(null)
  this._router.navigate(['/home'])
}
}


