import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Market } from "../market/market";
import { FAQ } from "../faq/faq";
import { Testimonial } from "../testimonial/testimonial";
import { Router, RouterLink } from '@angular/router';
import { Product } from '../../core/service/product-services';
import { IProduct } from '../../models/product.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [FAQ, Testimonial,CommonModule, RouterLink],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home implements OnInit{
  products!: IProduct[];
constructor(private router: Router, private productServices:Product, private dcr:ChangeDetectorRef) {}
  ngOnInit(): void {
    this.displayProducts()
  }

  goToMarketplace() {
    this.router.navigate(['marketplace']);
  }
displayProducts(){
  this.productServices.getProducts().subscribe({
      next: res => {
        this.products = res.data;
        console.log(this.products);
        
        this.dcr.detectChanges();
      },
      error: err => console.log(err.message)
    })
}
}
