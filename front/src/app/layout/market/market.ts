import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Product } from '../../core/service/product-services';
import { IProduct, IProductsResponse } from '../../models/product.model';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
// import { Cart } from "../cart/cart";
import { ICart } from '../../models/cart.model';
import { CartServices } from '../../core/service/cart-services';
import { RouterLink } from "@angular/router";
import { enviroment } from '../../../../enviroments/enviroment';

@Component({
  selector: 'app-market',
  imports: [CommonModule, RouterLink, FormsModule], 
  templateUrl: './market.html',
  styleUrls: ['./market.css']
})
export class Market implements OnInit {
  constructor(private _productService: Product,private dcr: ChangeDetectorRef,private http: HttpClient,
    private _cartService: CartServices,
  ) {}
showMsg = false;
message = '';
  products!: IProduct[];
  filteredProducts: IProduct[] = [];
  cartData!: ICart;
  staticURL = enviroment.staticURL;
  categories = ['skin care', 'clothing', 'accessories', 'books', 'food & beverages']
  searchQuery = '';
  selectedCategory = '';


  addToCart(myProduct:IProduct) { 
// console.log(myProduct);
this.cartData = {
items:[{
    productId: myProduct._id,
    quantity:1
}]
}
// console.log(this.cartData);
  this._cartService.addToCart(this.cartData)?.subscribe({
    next:res=>{
      console.log('Cart updated successfully:', res); 
        this.message = `item successfully added to cart!`;
        this.showMsg = true;

        setTimeout(() => this.showMsg = false, 1000);
              this.dcr.detectChanges()

      },
    error:err=>console.log(err.message)
  })
}
  ngOnInit(): void {
    this._productService.getProducts().subscribe({
      next: res => {
        this.products = res.data;
        this.filteredProducts = this.products.slice();
        this.dcr.detectChanges();
      },
      error: err => console.log(err.message)
    });

    // optional: keep other call if needed
    this._productService.getProductByCategoryName(this.searchQuery).subscribe(data=>{
      console.log(data);
    });
  }

  applyFilters() {
    const q = (this.searchQuery || '').toLowerCase().trim();
    const cat = (this.selectedCategory || '').toLowerCase();

    this.filteredProducts = (this.products || []).filter(p => {
      const matchesQuery = q
        ? ((p.name || '').toLowerCase().includes(q)
           || (p.description || '').toLowerCase().includes(q)
           || (p.category || '').toLowerCase().includes(q))
        : true;

      const matchesCategory = cat ? ((p.category || '').toLowerCase() === cat) : true;
      return matchesQuery && matchesCategory;
    });

    this.dcr.detectChanges();
  }

  trackById(index: number, item: IProduct) {
    return (item as any)?._id || index;
  }
}
