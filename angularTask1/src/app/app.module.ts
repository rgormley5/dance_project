import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { ServiceService } from './service.service';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ChoreoComponent } from './choreo/choreo.component';
import { AboutComponent } from './about/about.component';
import { GalleryComponent } from './gallery/gallery.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CartComponent } from './cart/cart.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ChoreoComponent,
    AboutComponent,
    GalleryComponent,
    DashboardComponent,
    CartComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule, 
    AppRoutingModule,
    FormsModule,
  ],
  providers: [ServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
