import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { IProduct } from '../../models/product.model';
import { Product } from '../../core/service/product-services';
import { CommonModule } from '@angular/common';
import { ICart } from '../../models/cart.model';
import { CartServices } from '../../core/service/cart-services';
import { enviroment } from '../../../../enviroments/enviroment';
import { Auth } from '../../core/service/auth-services';

@Component({
  selector: 'app-product-page',
  imports: [CommonModule, RouterLink],
  templateUrl: './product-page.html',
styleUrls: ['./product-page.css']
})
export class ProductPage implements OnInit {
constructor(private _activatedRoute:ActivatedRoute,
private _productService:Product,
private _router:Router, private cdr:ChangeDetectorRef,
private cartService:CartServices,private _authServices:Auth){}
slug!:string | null;
product!:IProduct;
staticURL = enviroment.staticURL;
relatedProducts!:IProduct[];
cartData!:ICart;
showMsg = false;
message = '';
isloggedin = false;

addToCart(myProduct:IProduct) { 
this.cartData = {
items:[{
    productId: myProduct._id,
    quantity:1
}]
}
  this.cartService.addToCart(this.cartData)?.subscribe({
    next:res=>{
      console.log('Cart updated successfully:', res); 
        this.message = `item added to cart!`;
        this.showMsg = true;

        setTimeout(() => this.showMsg = false, 1000);
              this.cdr.detectChanges()

        // alert(`${product.name} added to cart successfully!`);
      },
    error:err=>console.log(err.message)
  })
}
ngOnInit(): void {
this._authServices.getAuthName().subscribe(data=>{
  if(data){
    this.isloggedin= true;
  }
  else{
    this.isloggedin= false;
    this.message = `signup!`;

  }
})
this._activatedRoute.paramMap.subscribe(params=>
{
this.slug = params.get('slug');
  if(this.slug){
    this.loadProductData(this.slug);
  }
  else{
this._router.navigate(['/marketplace'])
  }
})
}

loadProductData(slug: string): void {
    this._productService.getProductBySlug(slug).subscribe({
      next:res=> {
        this.product= res.data;
        this._productService.getRaltedProducts(this.product.slug).subscribe(
          {
            next:res=> {
              this.relatedProducts=res.data;
              this.cdr.detectChanges();
            },
            error:err=>console.log(err.message)
          }
        );
        this.cdr.detectChanges();
      },
      error:err=> console.log(err.message)
    });
  }
}
