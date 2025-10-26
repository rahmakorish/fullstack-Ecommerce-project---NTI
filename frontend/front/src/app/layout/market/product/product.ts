import { Component, Input } from '@angular/core';
import { IProduct } from '../../../models/product.model';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-product',
  imports: [],
  templateUrl: './product.html',
  styleUrl: './product.css'
})
export class Product {
@Input() products!:IProduct;
}
