import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { authzGuard } from './authz.guard';

describe('authzGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => authzGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
