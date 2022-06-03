import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';

import { BrowserModule } from '@angular/platform-browser';

const routes : Routes=[

  {path:'home',
  component:HomeComponent}
]

@NgModule({
  declarations: [HomeComponent],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule

  ]
})
export class HomeModule { }
