import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";


// Load Icons
import { defineElement } from "@lordicon/element";
import lottie from "lottie-web";
import { SharedModule } from "../../shared/shared.module";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AccountModule {
  constructor() {
    defineElement(lottie.loadAnimation);
  }
}
