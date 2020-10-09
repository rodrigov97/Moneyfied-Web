import { TestBed } from '@angular/core/testing';

import { FilesHandlerService } from './files-handler.service';

describe('FilesHandlerService', () => {
  let service: FilesHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilesHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
