import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from '../../../../enviroments/enviroment';
import { Auth } from './auth-services';
import { IUserCart } from '../../models/cart.model';
import { map, Observable, of } from 'rxjs';
import { IOrder, IPlaceOrderRequest, IPlaceOrderResponse, IStatus, IUserOrder } from '../../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderServices {
    constructor(private _http:HttpClient, private authService:Auth){}
  apiURL= enviroment.apiURL+'order';
//display order for user
displayOrder():Observable<IUserOrder>| null{
  const token = this.authService.getToken();
  // console.log(token);
  
  if(token){  
    const headers = new HttpHeaders({Authorization: `Bearer ${token}`});
    
    return this._http.get<IUserOrder>(this.apiURL+'/getorder', 
      {headers}); 

  }
  // return of({ } as IUserCart);
  return null;
}
//display all orders to admin
displayAllOrders():Observable<IOrder[]>| null{
  const token = this.authService.getToken();
  
  
  if(token){  
    const headers = new HttpHeaders({Authorization: `Bearer ${token}`});
    
    return this._http.get<IUserOrder>(this.apiURL+'/getallorders', 
      {headers}).pipe(map(res => {
        if (Array.isArray(res)) return res as IOrder[];
        if (res && Array.isArray(res.userOrders)) return res.userOrders as IOrder[];
        if (res && Array.isArray(res.userOrders)) return res.userOrders as IOrder[]; // defensive
        return [];
      })); 

  }
  // return of({ } as IUserCart);
  return null;
}
//place order from cart
placeOrder(sentOrder:IPlaceOrderRequest):Observable<IPlaceOrderResponse>{
  const token = this.authService.getToken();
  // console.log(token);
  
  if(token){  
    const headers = new HttpHeaders({Authorization: `Bearer ${token}`});
    
    return this._http.post<IPlaceOrderResponse>(this.apiURL+'/placeorder',  sentOrder,{headers}); 

  }
  return of({ } as IPlaceOrderResponse);
}

//change order status
updateStatus(orderId:string, body:{status:string}):Observable<any>{
  const token = this.authService.getToken();
  if(token){  
    const headers = new HttpHeaders({Authorization: `Bearer ${token}`});
    return this._http.post<string>(this.apiURL+`/updatestatus/${orderId}`,  body ,{headers}); 

  }
  return of({ } as string);
}


}
