import { Routes, RouterModule } from '@angular/router';
import { Layout } from './layout/layout';
import { Login } from './login/login';
import { Signup } from './signup/signup';
import { FAQ } from './layout/faq/faq';
import { Testimonial } from './layout/testimonial/testimonial';
import { Dashboard } from './dashboard/dashboard';
import { Faqsettings } from './dashboard/faqsettings/faqsettings';
import { Testimonialsettings } from './dashboard/testimonialsettings/testimonialsettings';
import { Ordersettings } from './dashboard/ordersettings/ordersettings';
import { Productsettings } from './dashboard/productsettings/productsettings';
import { Notfound } from './notfound/notfound';
import { Home } from './layout/home/home';
import { DashHome } from './dashboard/dash-home/dash-home';
import { adminGuardGuard } from './core/gaurds/admin-guard-guard';
import { userGuard } from './core/gaurds/user-guard-guard';
import { Userssettings } from './dashboard/userssettings/userssettings';
import { Market } from './layout/market/market';
import { ProductPage } from './layout/product-page/product-page';
import { Category } from './dashboard/category/category';

export const routes: Routes = [
    {path:'', component:Layout, children:[
        {path:'',redirectTo:'home',pathMatch:'full'},
        {path:'home', component:Home},
        {path:'account', loadComponent:()=>import('./layout/account/account').then(a=>a.Account),
            canMatch:[userGuard]
        },
        {path:'cart', loadComponent:()=>import('./layout/cart/cart').then(a=>a.Cart),
            canMatch:[userGuard]
        },
        {path:'order', loadComponent:()=>import('./layout/order/order').then(a=>a.Order),
            canMatch:[userGuard]
        },
        {path:'faq', component:FAQ},  
        {path:'testimonial', component:Testimonial},  
        {path:'marketplace', component:Market},
        {path:'product/:slug', component:ProductPage}

    ]
},
    {path:'login', component:Login},
    {path:'signup', component:Signup},
    {path:'dashboard', component:Dashboard,canActivate:[adminGuardGuard],children:[
        {path:'', redirectTo:'home', pathMatch:'full'},
        {path:'home', component:DashHome},
        {path:'faqsettings', component:Faqsettings},
        {path:'testimonialsettings', component:Testimonialsettings},
        {path:'ordersettings', component:Ordersettings},
        {path:'userssettings', component:Userssettings},
        {path:'productsettings', component:Productsettings},
        {path:'category', component:Category},

    ]},
    {path:'**',component:Notfound}
];
