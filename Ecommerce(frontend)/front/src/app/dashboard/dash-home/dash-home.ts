import { Component } from '@angular/core';
import { Ordersettings } from "../ordersettings/ordersettings";
import { Productsettings } from "../productsettings/productsettings";

@Component({
  selector: 'app-dash-home',
  imports: [Ordersettings, Productsettings],
  templateUrl: './dash-home.html',
  styleUrl: './dash-home.css'
})
export class DashHome {

}
