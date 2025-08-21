import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { authnGuard } from './authn.guard';

describe('authnGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => authnGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
