import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { OrderServices } from '../../core/service/order-services';
import { ICartItem, IUserCart } from '../../models/cart.model';
import { IOrder, IOrderItem, IUserOrder } from '../../models/order.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order',
  imports: [CommonModule],
  templateUrl: './order.html',
  styleUrl: './order.css'
})
export class Order implements OnInit {
constructor(private _orderService:OrderServices, private cdr:ChangeDetectorRef, private _http:HttpClient){}
orderItems!:IOrder[];
item!:IOrderItem;
myOrders!:IUserOrder;
ordrstotalPrice=0;
  ngOnInit(): void {
  this._orderService.displayOrder()?.subscribe({
    next:res=>{
    this.myOrders = res;
    this.orderItems = res.userOrders
    // console.log(res.userOrders[0].items); 
    // console.log(this.orderItems);
    this.orderItems.forEach(item => {
      this.ordrstotalPrice += item.TotalPrice
      // console.log('Product:', this.ordrstotalPrice);
});
    this.cdr.detectChanges()
    }
    ,
    error:err=>console.log(err.message)
    
  })
  }
}


