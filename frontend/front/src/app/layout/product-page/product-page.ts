import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from '../../models/product.model';
import { Product } from '../../core/service/product-services';
import { CommonModule } from '@angular/common';
import { ICart } from '../../models/cart.model';
import { CartServices } from '../../core/service/cart-services';
import { enviroment } from '../../../../enviroments/enviroment';

@Component({
  selector: 'app-product-page',
  imports: [CommonModule],
  templateUrl: './product-page.html',
styleUrls: ['./product-page.css']
})
export class ProductPage implements OnInit {
constructor(private _activatedRoute:ActivatedRoute,
private _productService:Product,
private _router:Router, private cdr:ChangeDetectorRef,
private cartService:CartServices){}
slug!:string | null;
product!:IProduct;
staticURL = enviroment.staticURL;
relatedProducts!:IProduct[];
cartData!:ICart;
showMsg = false;
message = '';
//add to cart function :3
//convert IProduct data into ICart data :v :v :v 
// export interface ICart{
//     items:{
//     productId:string,  iproduct : //     _id:string,
//     quantity:1
// }[];
    
// }

addToCart(myProduct:IProduct) { 
// console.log(myProduct);
this.cartData = {
items:[{
    productId: myProduct._id,
    quantity:1
}]
}
// console.log(this.cartData);
  this.cartService.addToCart(this.cartData)?.subscribe({
    next:res=>{
      console.log('Cart updated successfully:', res); 
        this.message = `item successfully added to cart!`;
        this.showMsg = true;

        setTimeout(() => this.showMsg = false, 1000);
              this.cdr.detectChanges()

        // alert(`${product.name} added to cart successfully!`);
      },
    error:err=>console.log(err.message)
  })
}
ngOnInit(): void {
  // this.slug = this._activatedRoute.snapshot.paramMap.get('slug');

this._activatedRoute.paramMap.subscribe(params=>
{
this.slug = params.get('slug');
    // console.log(this.slug);

  if(this.slug){
    // console.log(this.slug);
    
this._productService.getProductBySlug(this.slug).subscribe({
  next:res=> {
    // console.log('response:', res.data);
    this.product= res.data
this._productService.getRaltedProducts(this.product.slug).subscribe(
  {
    next:res=> {
          // console.log('response:', res.data);

      this.relatedProducts=res.data
      // console.log(`related products: `+this.relatedProducts);
      this.cdr.detectChanges()

    },
    error:err=>console.log(err.message)
    
  }
)
this.cdr.detectChanges()

  },
  error:err=> console.log(err.message)
  
})
  }
  else{
this._router.navigate(['/marketplace'])
  }
})}}
