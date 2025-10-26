import { Component } from '@angular/core';
import { Market } from "../market/market";
import { FAQ } from "../faq/faq";
import { Testimonial } from "../testimonial/testimonial";

@Component({
  selector: 'app-home',
  imports: [Market, FAQ, Testimonial],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

}
