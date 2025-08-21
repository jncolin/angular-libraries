import { TestBed } from '@angular/core/testing';

import { CommonComponentsService } from './common-components.service';

describe('CommonComponentsService', () => {
  let service: CommonComponentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommonComponentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
