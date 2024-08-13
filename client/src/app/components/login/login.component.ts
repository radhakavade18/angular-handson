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
  errorMessage: string = "";
  roles: string[] = [];

  constructor(private authService: AuthService, private router: Router) {}

  loginForm = new FormGroup({
    username: new FormControl("", Validators.required),
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

    if (this.loginForm.invalid) {
      return;
    }
    const { username, password } = this.loginForm.value;

    this.authService.login(username as string, password as string).subscribe({
      next: (response) => {
        // this.authService.saveToken(response.token);
        this.router.navigate(["/home"]);
      },
    });
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
