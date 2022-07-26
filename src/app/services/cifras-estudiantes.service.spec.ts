import { TestBed } from '@angular/core/testing';

import { CifrasEstudiantesService } from './cifras-estudiantes.service';

describe('CifrasEstudiantesService', () => {
  let service: CifrasEstudiantesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CifrasEstudiantesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
