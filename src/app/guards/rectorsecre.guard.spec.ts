import { TestBed } from '@angular/core/testing';

import { RectorsecreGuard } from './rectorsecre.guard';

describe('RectorsecreGuard', () => {
  let guard: RectorsecreGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RectorsecreGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
