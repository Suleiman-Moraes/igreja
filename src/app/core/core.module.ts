import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    // NavbarComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    // BrowserAnimationsModule,
    HttpClientModule, 
    RouterModule
  ],
  exports:[
    //module
    BrowserModule,
    CommonModule,
    // BrowserAnimationsModule,
    HttpClientModule,
    RouterModule,

    //component
    // NavbarComponent
  ]
})
export class CoreModule { }
