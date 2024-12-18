import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken = localStorage.getItem('authToken');

    if (authToken) {
      const cloned = req.clone({
        setHeaders: {
          Authorization: `Bearer ${authToken}`
        }
      });

      return next.handle(cloned).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 403) {
            Swal.fire({
              icon: 'error',
              title: 'Access Denied',
              text: error.error?.message || 'You do not have permission to access this resource.',
              confirmButtonText: 'Okay',
            });
          }
          return throwError(() => error);
        })
      );
    }

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 403) {
          Swal.fire({
            icon: 'error',
            title: 'Access Denied',
            text: error.error?.message || 'You do not have permission to access this resource.',
            confirmButtonText: 'Okay',
          });
        }
        return throwError(() => error);
      })
    );
  }
}
