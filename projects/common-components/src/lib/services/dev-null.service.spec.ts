import { TestBed } from '@angular/core/testing';

import { DevNullService } from './dev-null.service';

describe('DevNullService', () => {
  let service: DevNullService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DevNullService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
