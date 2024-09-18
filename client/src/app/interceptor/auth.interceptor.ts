import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthService } from "../services/auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  // on every ONGOING request angular calls this method and pass the token with it
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const authToken = this.authService.getToken();
    const authRequest = request.clone({
      headers: request.headers.set("Authorization", "Bearer " + authToken),
    });
    return next.handle(authRequest);
  }
}

/*
  Interceptors are generally functions which you can run for each request, and have broad capabilities to affect the contents and overall flow of requests and responses. 
*/
