import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./components/login/login.component";
import { ButtonModule } from "primeng/button";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { InputTextModule } from "primeng/inputtext";
import { PreventCopyPasteDirective } from './directives/prevent-copy-paste.directive';

@NgModule({
  declarations: [AppComponent, LoginComponent, PreventCopyPasteDirective],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    ReactiveFormsModule,
    FormsModule,
    InputTextModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
