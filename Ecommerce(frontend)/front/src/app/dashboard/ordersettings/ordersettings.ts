import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { OrderServices } from '../../core/service/order-services';
import { HttpClient } from '@angular/common/http';
import { IOrder } from '../../models/order.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-ordersettings',
  imports: [CommonModule, FormsModule],
  // import { Order } from './../../layout/order/order';
templateUrl: './ordersettings.html',
  styleUrl: './ordersettings.css'
})
export class Ordersettings implements OnInit{
statuses: any;
constructor(private _orderServices:OrderServices, private _http:HttpClient,
private cdr:ChangeDetectorRef
){}
orders: IOrder[] = [];

  ngOnInit(): void {
  this._orderServices.displayAllOrders()?.subscribe({
      next:data=>{
        // console.log(data);

        this.orders = data || [];
        // console.log(this.orders);
        
        this.cdr.detectChanges()
      },
      error:err=>console.log(err.message)
      
    
  })
  }
  updateOrderStatus(orderId:string, newStatus:string){  
    this._orderServices.updateStatus(orderId,{status:newStatus}).subscribe({
      next:data=>{  
        // console.log(data);
            
        console.log(orderId,  data)
        // return order.status =status

      },
      // error:err=>console.log(err.message)
      
    })}

}
