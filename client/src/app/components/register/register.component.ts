import { Component } from "@angular/core";
import { Subscription } from "rxjs";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent {
  form: any = {};
  isSuccessful: boolean = false;
  isLoading: boolean = false;
  authStatusSubject: Subscription | undefined;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authStatusSubject = this.authService
      .getAuthStatusListener()
      .subscribe((authStatus) => {
        this.isLoading = false;
        console.log(authStatus);
        if (authStatus) {
          this.isSuccessful = true;
        }
        this.isSuccessful = false;
      });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    this.authService.registerUser(
      this.form.username,
      this.form.email,
      this.form.password
    );
  }

  ngOnDestroy() {
    this.authStatusSubject?.unsubscribe();
  }
}
