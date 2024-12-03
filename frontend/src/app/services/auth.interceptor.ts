import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Retrieve the auth token from localStorage
    const authToken = localStorage.getItem('authToken');

    // If token exists, clone the request and set the Authorization header
    if (authToken) {
      const cloned = req.clone({
        setHeaders: {
          Authorization: `Bearer ${authToken}`
        }
      });

      // Proceed with the cloned request
      return next.handle(cloned);
    }

    // If no token, proceed with the original request
    return next.handle(req);
  }
}
