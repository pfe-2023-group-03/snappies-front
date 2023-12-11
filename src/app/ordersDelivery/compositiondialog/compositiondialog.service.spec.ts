import { TestBed } from '@angular/core/testing';

import { CompositiondialogService } from './compositiondialog.service';

describe('CompositiondialogService', () => {
  let service: CompositiondialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompositiondialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
