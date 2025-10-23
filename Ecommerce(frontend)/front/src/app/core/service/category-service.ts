import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { enviroment } from '../../../../enviroments/enviroment';
import { Auth } from './auth-services';
import { Observable } from 'rxjs';
import { ICategory } from '../../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class Categoryservice {
  constructor(private _http:HttpClient, private authService:Auth){}
    apiURL= enviroment.apiURL+'category';
authentication():HttpHeaders|null{
  const token = this.authService.getToken();
  console.log(token);
  
  if(token){  
    return new HttpHeaders({Authorization: `Bearer ${token}`});}
  
    return null

  }
  getCategories():Observable<ICategory[]>{
    // Headers = this.authentication()
    return this._http.get<ICategory[]>(this.apiURL+'/get')
  }

  createNewCategory(category:string, subcategory:string):Observable<ICategory>{
    const headers = this.authentication()
    const myHeader = headers ? { headers } : {};

        return this._http.post<ICategory>(this.apiURL+'/create', {category, subcategory},myHeader)

  }
  searchByCategory(Id:string):Observable<ICategory[]>{
    return this._http.get<ICategory[]>(this.apiURL+`/getcategory/${Id}`)
  }

}
