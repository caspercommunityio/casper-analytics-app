import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { CasperService } from './casper.service';

describe('CasperService', () => {
  let service: CasperService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(CasperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
