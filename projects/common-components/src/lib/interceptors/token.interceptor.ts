import {
  HttpInterceptorFn,
  HttpRequest,
  HttpHandlerFn,
  HttpErrorResponse,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthnService, JWT_TOKEN_NAME } from  '../services/authn.service';
import { catchError, filter, switchMap, take, throwError, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';


export const tokenInterceptorFn: HttpInterceptorFn = (req, next) => {
  console.debug('Token interceptor called');
  const authnService = inject(AuthnService);

  // Add token if present
  const token = localStorage.getItem(JWT_TOKEN_NAME);
  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  } else {
    console.debug('No token found in local storage');
  }

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        return handle401(req, next, authnService);
      }
      return throwError(() => error);
    })
  );
};

// Token refresh logic with retry
let isRefreshing = false;
const refreshTokenSubject = new BehaviorSubject<string | null>(null);

function handle401(
  request: HttpRequest<any>,
  next: HttpHandlerFn,
  authnService: AuthnService
) {
  const router = inject(Router); 
  if (!isRefreshing) {
    isRefreshing = true;
    refreshTokenSubject.next(null);

    return authnService.refreshToken().pipe(
      switchMap((token: any) => {
        isRefreshing = false;
        const newToken = token.accessToken;
        localStorage.setItem(JWT_TOKEN_NAME, newToken);
        refreshTokenSubject.next(newToken);
        return next(
          request.clone({
            setHeaders: { Authorization: `Bearer ${newToken}` }
          })
        );
      }),
      catchError(err => {
        isRefreshing = false;
        authnService.signOut();
        console.error('Token refresh failed', err);
        return throwError(() => err);
      })
    );
  } else {
    return refreshTokenSubject.pipe(
      filter(token => token !== null),
      take(1),
      switchMap(token => {
        return next(
          request.clone({
            setHeaders: { Authorization: `Bearer ${token}` }
          })
        );
      })
    );
  }
}
