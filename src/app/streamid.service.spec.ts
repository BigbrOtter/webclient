import { TestBed, inject } from '@angular/core/testing';

import { StreamidService } from './streamid.service';

describe('StreamidService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StreamidService]
    });
  });

  it('should be created', inject([StreamidService], (service: StreamidService) => {
    expect(service).toBeTruthy();
  }));
});
