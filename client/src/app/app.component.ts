import { Component } from "@angular/core";
import { TokenStorageService } from "./services/token-storage.service";
import { AuthService } from "./services/auth.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  private roles: string[] = [];
  userIsAuthenticated: boolean = false;
  username: string = "";
  private authListenerSubs: Subscription | undefined;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.autoAuthUser();

    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe((result: any) => {
        this.userIsAuthenticated = result;
      });
  }

  logOut(): void {
    this.authService.logOut();
  }

  ngOnDestroy() {
    this.authListenerSubs?.unsubscribe();
  }
}
