import { TestBed, inject } from '@angular/core/testing';

import { CertifyLetterService } from './certify-letter.service';

describe('CertifyLetterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CertifyLetterService]
    });
  });

  it('should be created', inject([CertifyLetterService], (service: CertifyLetterService) => {
    expect(service).toBeTruthy();
  }));
});
