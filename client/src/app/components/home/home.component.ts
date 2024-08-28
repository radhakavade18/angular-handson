import { Component } from "@angular/core";
import { UsersService } from "src/app/services/users.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent {
  content: string = "";

  constructor(private userService: UsersService) {}

  ngOnInit() {
    this.userService.getPublicContent().subscribe(
      (data) => {
        this.content = data;
      },
      (err) => {
        // this.content = JSON.parse(err.error.message);
      }
    );
  }
}
