import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthenticationService } from "./authentication.service";
import { Router } from "@angular/router";
import { Observable, tap } from "rxjs";

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      tap(
        (event: any) => {},
        (error: { status: any; }) => {
          if (error instanceof HttpErrorResponse) {
            switch (error.status) {
              case 401:
              case 403:
                this.authService.signOut();
                this.router.navigateByUrl("/login");
                break;
              default:
                break;
            }
          }
        }
      )
    );
  }
}