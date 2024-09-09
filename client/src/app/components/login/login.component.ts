import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent {
  isLoggedIn: boolean = false;
  isSubmitted: boolean = false;
  isLoading: boolean = false;
  errorMessage: string = "";
  roles: string[] = [];

  constructor(private authService: AuthService, private router: Router) {}

  loginForm = new FormGroup({
    email: new FormControl("", [
      Validators.required,
      Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$"),
    ]),
    password: new FormControl("", [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  ngOnInit() {}

  onSubmit() {
    this.isSubmitted = true;
    const { email, password } = this.loginForm.value;
    if (this.loginForm.invalid) {
      return;
    }
    this.isLoading = true;

    this.authService.loginUser(email as string, password as string);
  }

  reloadPage(): void {
    window.location.reload();
  }

  get username() {
    return this.loginForm.get("username");
  }

  get email() {
    return this.loginForm.get("email");
  }

  get password() {
    return this.loginForm.get("password");
  }
}
