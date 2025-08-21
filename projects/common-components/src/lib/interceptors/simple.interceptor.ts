import { HttpInterceptorFn } from '@angular/common/http';

export const simpleInterceptor: HttpInterceptorFn = (req, next) => {
  console.debug('simpleInterceptor', req);
  return next(req);
};


