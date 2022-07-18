import { TestBed } from '@angular/core/testing';

import { DialogosService } from './dialogos.service';

describe('DialogosService', () => {
  let service: DialogosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DialogosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
