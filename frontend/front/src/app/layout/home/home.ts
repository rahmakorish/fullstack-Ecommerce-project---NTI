import { Component } from '@angular/core';
import { Market } from "../market/market";
import { FAQ } from "../faq/faq";
import { Testimonial } from "../testimonial/testimonial";
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [FAQ, Testimonial,],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home {
constructor(private router: Router) {}

  goToMarketplace() {
    this.router.navigate(['marketplace']);
  }
}
