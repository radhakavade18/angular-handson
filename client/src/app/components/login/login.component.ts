import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent {
  isLoggedIn: boolean = false;
  isLoading: boolean = false;
  errorMessage: string = "";
  roles: string[] = [];
  authStatusSubject: Subscription | undefined;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authStatusSubject = this.authService
      .getAuthStatusListener()
      .subscribe((authStatus) => {
        this.isLoading = false;
        if (!authStatus) {
          this.isLoggedIn = false;
        }
      });
  }

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

  onSubmit() {
    const { email, password } = this.loginForm.value;
    if (this.loginForm.invalid) {
      return;
    }
    this.isLoggedIn = true;
    this.isLoading = true;
    this.authService.loginUser(email as string, password as string);
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

  ngOnDestroy() {
    this.authStatusSubject?.unsubscribe();
  }
}
