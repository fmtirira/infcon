import { TestBed } from '@angular/core/testing';
import { InstitucionesService } from './instituciones.service';


describe('IntitucionesService', () => {
  let service: InstitucionesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InstitucionesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
