import { CanActivateFn, Router } from '@angular/router';
import { AuthnService } from '../services/authn.service';
import { inject } from '@angular/core';
import { LIB_LOGIN_URL, LIB_ERROR_URL } from '../lib-config';

export function authzGuard(roles: string[]): CanActivateFn {
  return (route, state) => {
    //console.debug('authzGuard', roles);
    const router = inject(Router);
    const authnService = inject(AuthnService);
    const loginUrl = inject(LIB_LOGIN_URL);
    const errorUrl = inject(LIB_ERROR_URL);

    let urlSegments: string[];

    if (!authnService.isAuthenticated) {
      urlSegments = loginUrl.split('/').filter(segment => segment);
      return router.createUrlTree(urlSegments);
    } else {
      // User may have multiple roles, so the rule should be understood as if user has any of the roles mentioned in roles, access granted
      for (let i = 0; i < roles.length; i++) {
        if ((authnService.roles) && (authnService.roles.includes(roles[i]))) {
          return true
        }
      }
      // User has no role that is allowed to access the resource
      // Redirect to error page
      urlSegments = errorUrl.split('/').filter(segment => segment);
      urlSegments.push('403');
      return router.createUrlTree(urlSegments);
    }
  }
}
