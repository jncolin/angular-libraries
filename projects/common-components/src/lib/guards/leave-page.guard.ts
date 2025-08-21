import { CanDeactivateFn } from '@angular/router';

export const leavePageGuard: CanDeactivateFn<unknown> = (component, currentRoute, currentState, nextState) => {
  return true;
};
