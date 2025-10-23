import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from '../../../../enviroments/enviroment';
import { Observable, of } from 'rxjs';
import { ITestimonial} from '../../models/testimonial.model';
import { Auth } from './auth-services';

@Injectable({
  providedIn: 'root'
})
export class TestimonialService {
  constructor(private _http:HttpClient , private authService:Auth){}
  apiURL = enviroment.apiURL+'testimonial/'

  getTestimonials():Observable<ITestimonial[]>{
    return this._http.get<ITestimonial[]>(this.apiURL)
  }
  
  addTestimonial(userTestimonial:ITestimonial){
    return this._http.post(this.apiURL+'createTestiominal', userTestimonial)
  }
hideReview(reviewId:string):Observable<ITestimonial>{
const token = this.authService.getToken();
  if(token){  
    const headers = new HttpHeaders({Authorization: `Bearer ${token}`});
    return this._http.post<ITestimonial>(this.apiURL+'hide',{_id:reviewId}, {headers} )
  }
  else{
    return of({ } as ITestimonial);
  }
    


}

}
