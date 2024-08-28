import { Component } from "@angular/core";
import { TokenStorageService } from "./services/token-storage.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  private roles: string[] = [];
  isLoggedIn: boolean = false;
  showAdminBoard: boolean = false;
  showModeratorBoard: boolean = false;
  username: string = "";

  constructor(private tokenStorageService: TokenStorageService) {}

  onOnInit() {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes("ROLE_ADMIN");
      this.showModeratorBoard = this.roles.includes("ROLE_MODERATOR");

      this.username = user.userName;
    }
  }

  logOut(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
}
