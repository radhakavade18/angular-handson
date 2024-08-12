import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class JWTTokenService {
  jwtToken: string = "";

  decodedToken: { [key: string]: string } | undefined;

  constructor() {}
}
