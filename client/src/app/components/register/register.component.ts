import { Component } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent {
  form: any = {};
  isSuccessful: boolean = false;
  isRegistered: any;
  isLoading: boolean = false;

  constructor(private authService: AuthService) {}

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    this.isRegistered = this.authService.registerUser(
      this.form.username,
      this.form.email,
      this.form.password
    );
    if (this.isRegistered) {
      this.isSuccessful = true;
    }
  }
}
