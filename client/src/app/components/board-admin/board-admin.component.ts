import { Component } from "@angular/core";
import { UsersService } from "src/app/services/users.service";

@Component({
  selector: "app-board-admin",
  templateUrl: "./board-admin.component.html",
  styleUrls: ["./board-admin.component.scss"],
})
export class BoardAdminComponent {
  content: string = "";

  constructor(private userService: UsersService) {}

  ngOnInit() {
    this.userService.getAdminBoard().subscribe(
      (data) => {
        this.content = data;
      },
      (err) => {
        this.content = JSON.parse(err.error).message;
      }
    );
  }
}
