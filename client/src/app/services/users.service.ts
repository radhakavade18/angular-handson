import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

const AUTH_API = "http://localhost:3001/users";

@Injectable({
  providedIn: "root",
})
export class UsersService {
  constructor(private http: HttpClient) {}

  getPublicContent(): Observable<any> {
    return this.http.get(AUTH_API + "/all", { responseType: "text" });
  }

  getUserBoard(): Observable<any> {
    return this.http.get(AUTH_API + "/user", { responseType: "text" });
  }

  getModeratorBoard(): Observable<any> {
    return this.http.get(AUTH_API + "/mod", { responseType: "text" });
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(AUTH_API + "/admin", { responseType: "text" });
  }
}
