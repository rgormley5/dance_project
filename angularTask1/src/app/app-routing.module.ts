import { ChoreoComponent } from './choreo/choreo.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AboutComponent } from './about/about.component';
import { GalleryComponent } from './gallery/gallery.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CartComponent } from './cart/cart.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';

const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: '/home' },
    { path: 'about', component: AboutComponent },
    { path: 'cart', component: CartComponent },
    { path: 'choreo', component: ChoreoComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'gallery', component: GalleryComponent },
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: '**', component: HomeComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }