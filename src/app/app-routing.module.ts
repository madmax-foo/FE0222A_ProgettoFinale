import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule, FormsModule} from '@angular/forms';
import { SignupComponent } from './components/signup/signup.component';
import { HomeComponent } from './home/home.component';
import { ClientiComponent } from './components/clienti/clienti.component';
import { UtentiComponent } from './components/utenti/utenti.component';
import { AuthGuard } from './auth/guard';
import { FattureComponent } from './components/fatture/fatture.component';
import { ModifattComponent } from './components/modificafattura/modifatt.component';
import { NewcliComponent } from './components/clienti/newcli/newcli.component';
import { DettaglioComponent } from './components/fatture/dettaglio/dettaglio.component';
import { NuovaComponent } from './components/fatture/nuova/nuova.component';




const routes: Routes = [

{
  path:'home',
  component:HomeComponent,
  canActivate:[AuthGuard]


},

  {
    path:'signup',
    component:SignupComponent,

  },



  {
    path:'', pathMatch:'full',
    component:LoginComponent
},

{path:'utenti',
component:UtentiComponent,
canActivate:[AuthGuard]


},


{path:'clienti',
component:ClientiComponent,
canActivate:[AuthGuard]


},

{
  path:'fatture',
  component:FattureComponent,
  canActivate:[AuthGuard]


},

{
  path:'fattdett/:id',
  component:DettaglioComponent,
  canActivate:[AuthGuard]
},

{
  path:'modifatt/:id',
  component:ModifattComponent,
  canActivate:[AuthGuard]
},

{
  path:'nuovafatt',
  component:NuovaComponent,
  canActivate:[AuthGuard]

},

{
  path:'modifica/:id',
  component:NewcliComponent,
  canActivate:[AuthGuard]
},


{
  path:'newcli',
  component:NewcliComponent,
  canActivate:[AuthGuard]
}

];

@NgModule({
  imports: [RouterModule.forRoot(routes),
    ReactiveFormsModule,
    FormsModule],


  exports: [RouterModule]
})
export class AppRoutingModule { }
