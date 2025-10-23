import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from '../../../../enviroments/enviroment';
import { IProduct } from './../../models/product.model';
import { ICart, ICartResponse, IUserCart } from '../../models/cart.model';
import { Observable, of } from 'rxjs';
import { Auth } from './auth-services';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class CartServices {
  constructor(private _http:HttpClient, private authService:Auth){}
  
  // headers = {Authorization: `Bearer ${this.authService.getToken()}`};
  apiURL= enviroment.apiURL+'cart';

addToCart(cartItems:ICart|null):Observable<ICart>|null{
  const token = this.authService.getToken();
    // console.log(cartItems);
    // console.log(`cartitems from services ${cartItems?.items}`);

  if(token){  
    const headers = new HttpHeaders({Authorization: `Bearer ${token}`});
    // console.log(`cartitems from services ${cartItems}`);
    
    return this._http.post<ICart>(this.apiURL+'/addtocart', cartItems, {headers})

  }
  return null
  // const token = {Authorization: `Bearer ${this.authService.getToken()}`};
}
displayCart():Observable<IUserCart>| null{
  const token = this.authService.getToken();
  // console.log(token);
  
  if(token){  
    const headers = new HttpHeaders({Authorization: `Bearer ${token}`});
    
    return this._http.get<IUserCart>(this.apiURL+'/', 
      {headers}); 

  }
  return of({ } as IUserCart);
}

removeItem(id: string): Observable<IUserCart>{
    const token = this.authService.getToken();
    // console.log(token);
  
  if(token){  
    const headers = new HttpHeaders({Authorization: `Bearer ${token}`});
    
    return this._http.delete<IUserCart>(this.apiURL+`/clearitem/${id}`, {headers});
  }
    return of({ } as IUserCart);
}
}
