import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoginComponent } from "../components/login/login.component";
import { RegisterComponent } from "../components/register/register.component";
import { AngularMaterialModule } from "../angular-material/angular-material.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AuhtRoutingModule } from "./auth-routing.module";

@NgModule({
  declarations: [RegisterComponent, LoginComponent],
  imports: [
    CommonModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    AuhtRoutingModule,
  ],
})
export class AuthModule {}
