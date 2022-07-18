import { TestBed } from '@angular/core/testing';

import { UsurectorsecreService } from './usurectorsecre.service';

describe('UsurectorsecreService', () => {
  let service: UsurectorsecreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsurectorsecreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
