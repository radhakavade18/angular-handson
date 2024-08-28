import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./components/login/login.component";
import { HomeComponent } from "./components/home/home.component";
import { RegisterComponent } from "./components/register/register.component";
import { BoardUserComponent } from "./components/board-user/board-user.component";
import { BoardModeratorComponent } from "./components/board-moderator/board-moderator.component";
import { BoardAdminComponent } from "./components/board-admin/board-admin.component";
import { ProfileComponent } from "./components/profile/profile.component";
import { AuthGuard } from "./guards/auth.guard";

const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "home", component: HomeComponent },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "user", component: BoardUserComponent },
  { path: "mod", component: BoardModeratorComponent },
  { path: "admin", component: BoardAdminComponent, canActivate: [AuthGuard] },
  { path: "profile", component: ProfileComponent },
  {
    path: "posts",
    loadChildren: () =>
      import("./posts/posts.module").then((m) => m.PostsModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
