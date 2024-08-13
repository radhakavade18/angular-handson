import { Component } from "@angular/core";
import { Route, Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent {
  form: any = {};
  isSuccessful: boolean = false;
  isSubmitted: boolean = false;
  errorMessage: string = "";

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    this.authService
      .register(this.form.userName, this.form.email, this.form.password)
      .subscribe(
        (data) => {
          console.log(data);
          this.isSuccessful = true;
          this.router.navigate(["/login"]);
        },
        (err) => {
          this.errorMessage = err.error.message;
          this.isSuccessful = false;
        }
      );
  }
}
