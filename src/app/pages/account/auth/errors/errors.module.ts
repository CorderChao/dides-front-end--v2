import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

// Load Icons
import { defineElement } from "@lordicon/element";
import lottie from 'lottie-web';

// Component
import { Error404RoutingModule } from "./errors-routing.module";
import { Page500Component } from './page500/page500.component';


@NgModule({
  declarations: [
    Page500Component,
  ],
  imports: [
    CommonModule,
    Error404RoutingModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ErrorsModule {
  constructor() {
    defineElement(lottie.loadAnimation);
  }
}
