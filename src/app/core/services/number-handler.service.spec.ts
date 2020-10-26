import { TestBed } from '@angular/core/testing';

import { NumberHandlerService } from './number-handler.service';

describe('NumberHandlerService', () => {
  let service: NumberHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NumberHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
