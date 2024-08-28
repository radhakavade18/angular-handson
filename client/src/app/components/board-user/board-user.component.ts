import { Component } from "@angular/core";
import { UsersService } from "src/app/services/users.service";

@Component({
  selector: "app-board-user",
  templateUrl: "./board-user.component.html",
  styleUrls: ["./board-user.component.scss"],
})
export class BoardUserComponent {
  content: string = "";

  constructor(private userService: UsersService) {}

  ngOnInit() {
    this.userService.getUserBoard().subscribe(
      (data) => {
        this.content = data;
      },
      (err) => {
        this.content = JSON.parse(err.error).message;
      }
    );
  }
}
