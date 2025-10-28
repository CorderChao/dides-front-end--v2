import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

// search module
import { NgPipesModule } from "ngx-pipes";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NgHttpLoaderModule } from 'ng-http-loader';


// Auth
import {
  HttpClientModule,
  HttpClient,
  HTTP_INTERCEPTORS,
} from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { environment } from "src/environments/environment";

// Language
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";

// Store
import { StoreModule } from "@ngrx/store";
import { metaReducers, reducers } from "./store/reducers";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { EffectsModule } from "@ngrx/effects";
import { SharedModule } from "./shared/shared.module";
import { LayoutsModule } from "./shared/layouts/layouts.module";
import { STORE_EFFECTS } from "./store/effects";

import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { NgxsModule } from "@ngxs/store";
import { MessageState } from "./shared/components/dynamic-form/store/message.state";
import { NgxsReduxDevtoolsPluginModule } from "@ngxs/devtools-plugin";
import { JwtInterceptor } from "./modules/user-management/services/token.interceptor";
import { LocationStrategy, HashLocationStrategy } from "@angular/common";
import { ToastrModule } from "ngx-toastr";



export function createTranslateLoader(http: HttpClient): any {
  return new TranslateHttpLoader(http, "assets/i18n/", ".json");
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    ToastrModule.forRoot(
      // { positionClass: 'toast-top-full-width'}
    ),
    NgHttpLoaderModule.forRoot(),
    BrowserAnimationsModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    LayoutsModule,
    SharedModule,
    NgPipesModule,
  
    EffectsModule.forRoot(STORE_EFFECTS),
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
      },
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
    TranslateModule.forRoot({
      defaultLanguage: "en",
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
    NgxsModule.forRoot([MessageState]),
    environment.production ? [] : NgxsReduxDevtoolsPluginModule.forRoot(),
   
  ],

  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
   { provide: LocationStrategy, useClass: HashLocationStrategy }
 ],
 bootstrap: [AppComponent],
  
})
export class AppModule {}
