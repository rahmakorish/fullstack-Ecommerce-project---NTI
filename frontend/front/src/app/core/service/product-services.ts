import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { enviroment } from '../../../../enviroments/enviroment';
import { IProduct, IProductResponse, IProductsResponse } from '../../models/product.model';
import { Auth } from './auth-services';

@Injectable({
  providedIn: 'root'
})
export class Product {
  constructor(private _http:HttpClient, private authService:Auth){}
  apiURL= enviroment.apiURL+'product';
  
  getProducts():Observable<IProductsResponse>{
    return this._http.get<IProductsResponse>(this.apiURL+'/getproducts');
  }
  getProductBySlug(slug:string):Observable<IProductResponse>{
    return this._http.get<IProductResponse>(this.apiURL+`/getproducts/${slug}`)
  }
  getProductByCategoryName(category:string):Observable<IProductResponse>{
    return this._http.get<IProductResponse>(this.apiURL+`/getcategory/${category}`)
  }

  getRaltedProducts(slug:string):Observable<IProductsResponse>{
    return this._http.get<IProductsResponse>(this.apiURL+`/related/'${slug}`)
  }
  //admin creates new product in product form
  createProduct(productFormData: FormData):Observable<IProduct>{
    const token = this.authService.getToken();
  if(token){  
    const headers = new HttpHeaders({Authorization: `Bearer ${token}`});
    return this._http.post<IProduct>(this.apiURL+'/createproduct',productFormData,{headers}); 

  }
  return of({ } as IProduct);

  }
}
