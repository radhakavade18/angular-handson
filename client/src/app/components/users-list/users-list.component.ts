import { Component } from "@angular/core";

@Component({
  selector: "app-users-list",
  templateUrl: "./users-list.component.html",
  styleUrls: ["./users-list.component.scss"],
})
export class UsersListComponent {
  usersList: any = [
    { name: "user1", email: "user1@gmail.com" },
    { name: "user2", email: "user2@gmail.com" },
  ];

  onDeleteUser(index: number) {
    console.log(index);
  }
}
