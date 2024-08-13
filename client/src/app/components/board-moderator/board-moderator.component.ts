import { Component } from "@angular/core";
import { UsersService } from "src/app/services/users.service";

@Component({
  selector: "app-board-moderator",
  templateUrl: "./board-moderator.component.html",
  styleUrls: ["./board-moderator.component.scss"],
})
export class BoardModeratorComponent {
  content: string = "";

  constructor(private userService: UsersService) {}

  ngOnInit() {
    this.userService.getModeratorBoard().subscribe(
      (data) => {
        this.content = data;
      },
      (err) => {
        this.content = JSON.parse(err.error).message;
      }
    );
  }
}
