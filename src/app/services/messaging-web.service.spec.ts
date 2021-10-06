import { TestBed } from '@angular/core/testing';

import { MessagingWebService } from './messaging-web.service';

describe('MessagingWebService', () => {
  let service: MessagingWebService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessagingWebService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
