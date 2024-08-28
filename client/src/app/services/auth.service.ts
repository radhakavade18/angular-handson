import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private apiUrl = "http://localhost:3001/api/auth";
  private tokenKey = "authToken";

  constructor(private http: HttpClient) {}

  login(userName: string, password: string) {
    return this.http.post(`${this.apiUrl}/login`, { userName, password });
  }

  // Method to register a new user
  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, {
      username,
      email,
      password,
    });
  }

  // Save JWT token to sessionStorage
  saveToken(token: string): void {
    sessionStorage.setItem(this.tokenKey, token);
  }

  getToken() {
    return sessionStorage.getItem("authToken");
  }

  isAuthenticated() {
    return !!this.getToken();
  }

  getHeaders() {
    return new HttpHeaders().set("Authorization", `Bearer ${this.getToken()}`);
  }

  getProtectedResource() {
    return this.http.get(`${this.apiUrl}/protected`, {
      headers: this.getHeaders(),
    });
  }
}
