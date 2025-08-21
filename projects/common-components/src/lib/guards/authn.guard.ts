import { CanActivateFn, Router } from '@angular/router';
import { AuthnService } from '../services/authn.service';
import { inject } from '@angular/core';
import { LIB_LOGIN_URL } from '../lib-config';

export function authnGuard(): CanActivateFn {
  return (route, state) => {
    console.debug('authnGuard');
    const router = inject(Router);
    const authnService = inject(AuthnService);
    const loginUrl = inject(LIB_LOGIN_URL);
    if (!authnService.isAuthenticated) {
      console.debug('not authenticated');
      // after the restart, memory is cleared, so let' see if there's a valid token saved in localstorage
      if (!authnService.loadToken()) {
        console.debug('no token loaded');
        const urlSegments = loginUrl.split('/').filter(segment => segment);
        return router.createUrlTree(urlSegments, {
          queryParams: { returnUrl: state.url }
        });
      }
      console.debug('authenticated');
      return true;
    } else
      console.debug('authenticated');

    return true;
  };
}
