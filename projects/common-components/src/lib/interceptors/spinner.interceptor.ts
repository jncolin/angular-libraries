import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { SpinnerService } from '../services/spinner.service';


@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {

  constructor(private spinnerService: SpinnerService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.spinnerService.show();
    // console.debug('spinner inteceptor');
    return next.handle(request)
      .pipe(tap({
        next: (event) => {
          if (event instanceof HttpResponse) {
            this.spinnerService.hide();
          }
        },
        error: (error) => {
          this.spinnerService.hide();
        }
      })
      );
  }
}
