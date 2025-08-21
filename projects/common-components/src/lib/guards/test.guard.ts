import { CanActivateFn } from '@angular/router';

export const testGuard: CanActivateFn = (route, state) => {
  console.debug('testGuard');
  return true;
};
