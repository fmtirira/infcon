import { TestBed } from '@angular/core/testing';

import { DirectivoGuard } from './directivo.guard';

describe('DirectivoGuard', () => {
  let guard: DirectivoGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(DirectivoGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
