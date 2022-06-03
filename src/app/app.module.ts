import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { Authinterceptor} from './interceptor/http.interceptor';
import { NavbarComponent } from './components/navbar/navbar.component';
import { UtentiComponent } from './components/utenti/utenti.component';
import { ClientiComponent } from './components/clienti/clienti.component';
import { FattureComponent } from './components/fatture/fatture.component';
import { ModifattComponent} from './components/modificafattura/modifatt.component';
import { NewcliComponent } from './components/clienti/newcli/newcli.component';
import { DettaglioComponent } from './components/fatture/dettaglio/dettaglio.component';
import { NuovaComponent } from './components/fatture/nuova/nuova.component';









@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    NavbarComponent,
    UtentiComponent,
    ClientiComponent,
    FattureComponent,

    ModifattComponent,
     NewcliComponent,
     DettaglioComponent,
     NuovaComponent,




],


  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatCardModule,
    NgxPaginationModule,


],
  providers: [{
    provide:HTTP_INTERCEPTORS,
    useClass: Authinterceptor,
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
