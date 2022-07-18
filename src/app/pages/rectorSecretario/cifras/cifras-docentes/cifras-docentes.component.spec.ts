import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CifrasDocentesComponent } from './cifras-docentes.component';

describe('CifrasDocentesComponent', () => {
  let component: CifrasDocentesComponent;
  let fixture: ComponentFixture<CifrasDocentesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CifrasDocentesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CifrasDocentesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
