import { TestBed } from '@angular/core/testing';

import { CasperService } from './casper.service';

describe('CasperService', () => {
  let service: CasperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CasperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
