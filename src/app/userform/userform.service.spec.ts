import { TestBed } from '@angular/core/testing';

import { UserformService } from './userform.service';

describe('LoginformService', () => {
  let service: UserformService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserformService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
