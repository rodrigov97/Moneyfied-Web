import { TestBed } from '@angular/core/testing';

import { TokenErrorHandlerService } from './token-error-handler.service';

describe('TokenErrorHandlerService', () => {
  let service: TokenErrorHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TokenErrorHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
