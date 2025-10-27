import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { CartServices } from '../../core/service/cart-services';
import { ICart, ICartItem, ICartResponse, IUserCart } from '../../models/cart.model';
import { IProduct } from '../../models/product.model';
import { CommonModule } from '@angular/common';
import { Order } from "../order/order";
import { OrderServices } from '../../core/service/order-services';
import { IOrder, IOrderItem, IPlaceOrderRequest } from '../../models/order.model';
import { RouterLink } from '@angular/router';
import { enviroment } from '../../../../enviroments/enviroment';

@Component({
  selector: 'app-cart',
  imports: [CommonModule, Order,RouterLink],
templateUrl: './cart.html',
  styleUrl: './cart.css'
})
export class Cart implements OnInit{
myOrder!:IOrder[];
orderItem!:IOrderItem;
myCart!:IUserCart;
cartItems!:ICartItem[];
item!:ICartItem;
staticURL = enviroment.staticURL;

@Input() product!:string;
constructor(private _cartService: CartServices, private cdr:ChangeDetectorRef, private _http:HttpClient,
  private orderServices:OrderServices){}

  ngOnInit(): void {
  this._cartService.displayCart()?.subscribe({
    next:cart=>{
    console.log(`cart data returned `+ cart.totalItemsPrice);
    this.myCart = cart
    
    this.cartItems = this.myCart.items
    this.cdr.detectChanges()
    }
    ,
    error:err=>console.log(err.message)
    
  })
  
}

  // getProductPrice(item: ICartItem) {
  //   return item.product.price 
  // }
  // getTotalPrice(item: ICartItem){
  //   console.log(item.product.price);
    
  //   if(item.product.price)
  //   {return (item.product.price  * item.quantity);}
  //   else{return 0}
  // }


    removeItem(productId: string): void {
    console.log(productId);
    if (!confirm('Remove this item from cart?')) return;

    this._cartService.removeItem(productId).subscribe({
      next: (cart) => {
        // update cart to reflects change
        this.myCart = cart;
        console.log('my new cart after item removal: '+ this.myCart.items);
        this._cartService.displayCart()
        // this.cartItems = cart.items || [];
        this.cdr.detectChanges();
      },
      error: (err) => { console.error('Remove item failed:', err); }
    });
  }

CartToOrder(cart: IUserCart): IPlaceOrderRequest {
  const items = (cart.items || []).map(item => {
const productId = (item as any).product? (typeof (item as any).product === 'string'? (item as any).product
: (item as any).product._id || (item as any).product): '';
      return { product: productId, quantity: item.quantity };
    });
    return {
      user: cart.user,
      items,
      totalItemsPrice: cart.totalItemsPrice
    };
}
//place order
placeOrderFromCart(): void {
    if (!this.myCart) return;
    if (!confirm('Place order for current cart?')) return;

    const myCartItems = this.CartToOrder(this.myCart);
    
    this.orderServices.placeOrder(myCartItems).subscribe({
      next: (order) => {
        console.log('Order placed', order);
        // refresh cart from server (if displayCart available) so UI reflects the emptied/updated cart
        const disp$ = this._cartService.displayCart();
        if (disp$) {
          disp$.subscribe({
            next: cart => {
              this.myCart = cart;
              this.cartItems = cart.items || [];
              this.cdr.detectChanges();
            },
            error: err => console.error(err.message)
          });
        } else {
          // this.myCart = { user: this.myCart.user, items: [], totalItemsPrice: 0 } as IUserCart;
          this.cartItems = [];
          this.cdr.detectChanges();
        }
      },
      error: (err) => {console.log(err.message);}
    });

}}
