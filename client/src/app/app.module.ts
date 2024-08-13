import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./components/login/login.component";
import { ButtonModule } from "primeng/button";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { InputTextModule } from "primeng/inputtext";
import { PreventCopyPasteDirective } from "./directives/prevent-copy-paste.directive";
import { HomeComponent } from "./components/home/home.component";
import { HttpClientModule } from "@angular/common/http";
import { RegisterComponent } from "./components/register/register.component";
import { ProfileComponent } from "./components/profile/profile.component";
import { BoardAdminComponent } from "./components/board-admin/board-admin.component";
import { BoardUserComponent } from "./components/board-user/board-user.component";
import { BoardModeratorComponent } from "./components/board-moderator/board-moderator.component";
import { MenubarModule } from "primeng/menubar";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { authInterceptorProviders } from "./helper/auth.interceptor";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PreventCopyPasteDirective,
    HomeComponent,
    RegisterComponent,
    ProfileComponent,
    BoardAdminComponent,
    BoardUserComponent,
    BoardModeratorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    ReactiveFormsModule,
    FormsModule,
    InputTextModule,
    HttpClientModule,
    MenubarModule,
    NgbModule,
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule {}
