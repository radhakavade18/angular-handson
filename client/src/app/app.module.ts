import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ButtonModule } from "primeng/button";
import { InputTextModule } from "primeng/inputtext";
import { PreventCopyPasteDirective } from "./directives/prevent-copy-paste.directive";
import { HomeComponent } from "./components/home/home.component";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { ProfileComponent } from "./components/profile/profile.component";
import { MenubarModule } from "primeng/menubar";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { UsersListComponent } from "./components/users-list/users-list.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AuthInterceptor } from "./interceptor/auth.interceptor";
import { ErrorInterceptor } from "./interceptor/error.interceptor";
import { ErrorComponent } from "./components/error/error.component";
import { AngularMaterialModule } from "./angular-material/angular-material.module";

@NgModule({
  declarations: [
    AppComponent,
    PreventCopyPasteDirective,
    HomeComponent,
    ProfileComponent,
    UsersListComponent,
    ErrorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    InputTextModule,
    HttpClientModule,
    MenubarModule,
    NgbModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
  entryComponents: [ErrorComponent],
})
export class AppModule {}
