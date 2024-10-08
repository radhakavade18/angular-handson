import { Component } from "@angular/core";
import { TokenStorageService } from "src/app/services/token-storage.service";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent {
  currentUser: any;
  constructor(private token: TokenStorageService) {}

  ngOnInit() {
    this.currentUser = this.token.getUser();
  }
}
