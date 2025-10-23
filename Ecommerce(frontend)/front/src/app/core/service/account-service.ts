import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Auth } from './auth-services';
import { enviroment } from '../../../../enviroments/enviroment';
import { IUserData } from './../../models/user.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
      constructor(private _http:HttpClient, private authService:Auth){}
  apiURL= enviroment.apiURL+'user';
// IUserData
displayData():Observable<IUserData[]>|null{
  const token = this.authService.getToken();
  if(token){
  const headers = new HttpHeaders({Authorization: `Bearer ${token}`});
  return this._http.get<IUserData[]>(this.apiURL+'/account', {headers})

  }
  return of({ } as IUserData[]);
}
// admin getting all users
getUsersInfo():Observable<IUserData[]>|null{
  const token = this.authService.getToken();
  if(token){
  const headers = new HttpHeaders({Authorization: `Bearer ${token}`});
  return this._http.get<IUserData[]>(this.apiURL+'/', {headers})
  }
  return of({ } as IUserData[]);
}



//admin creating new admin :3
createadmin(newAdminData:IUserData):Observable<IUserData>{
  const token = this.authService.getToken();
  if(token){
  const headers = new HttpHeaders({Authorization: `Bearer ${token}`});
  return this._http.post<IUserData>(this.apiURL+'/createadmin', newAdminData ,{headers}  )
  }
  return of({ } as IUserData);
}

}
