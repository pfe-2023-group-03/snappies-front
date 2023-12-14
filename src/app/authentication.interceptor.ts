import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { Router } from '@angular/router';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {


  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}


    intercept(
      request: HttpRequest<any>,
      next: HttpHandler
    ): Observable<HttpEvent<any>> {
      const token = this.authService.getToken()

      if (token) {
        const cloned = request.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`,
          },
        });

        return next.handle(cloned).pipe(
          catchError((error) => {
            if (error.status === 403) {
              this.authService.signOut();
              this.router.navigateByUrl("/login");
            }
            return throwError(error);
          })
        );
      } else {
        return next.handle(request);
      }
    }
}
