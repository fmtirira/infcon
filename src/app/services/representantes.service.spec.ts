import { TestBed } from '@angular/core/testing';

import { RepresentantesService } from './representantes.service';

describe('RepresentantesService', () => {
  let service: RepresentantesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RepresentantesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
