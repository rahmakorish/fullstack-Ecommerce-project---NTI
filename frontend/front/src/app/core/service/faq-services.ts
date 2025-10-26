import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { enviroment } from './../../../../enviroments/enviroment';
import { Observable, of } from 'rxjs';
import { IFAQ } from '../../models/faq.model';
import { Auth } from './auth-services';

@Injectable({
  providedIn: 'root'
})
export class FaqServices {
constructor( private _http:HttpClient, private authService:Auth){}
apiURL = enviroment.apiURL+'FAQ';

getQustions():Observable<IFAQ>{
  return this._http.get<IFAQ>(this.apiURL)
}

createQuestion(question:IFAQ){
    const token = this.authService.getToken();
if(token){  
    const headers = new HttpHeaders({Authorization: `Bearer ${token}`});
return this._http.post(this.apiURL+'/createFAQ',question, {headers})
}
else{
  return of({ } as IFAQ);
}
}
hidequestion(questionId:string):Observable<IFAQ>{
  const token = this.authService.getToken();
  if(token){  
    const headers = new HttpHeaders({Authorization: `Bearer ${token}`});
    return this._http.post<IFAQ>(this.apiURL+'hide',{_id:questionId}, {headers} )
  }
  else{
    return of({ } as IFAQ);
  }
}
}

