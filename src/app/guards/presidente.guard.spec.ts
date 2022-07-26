import { TestBed } from '@angular/core/testing';

import { PresidenteGuard } from './presidente.guard';

describe('PresidenteGuard', () => {
  let guard: PresidenteGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PresidenteGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
