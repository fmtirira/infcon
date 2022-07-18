import { TestBed } from '@angular/core/testing';

import { UsupresidentesService } from './usupresidentes.service';

describe('UsupresidentesService', () => {
  let service: UsupresidentesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsupresidentesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
