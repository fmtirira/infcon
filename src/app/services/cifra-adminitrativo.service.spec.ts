import { TestBed } from '@angular/core/testing';

import { CifraAdminitrativoService } from './cifra-adminitrativo.service';

describe('CifraAdminitrativoService', () => {
  let service: CifraAdminitrativoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CifraAdminitrativoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
