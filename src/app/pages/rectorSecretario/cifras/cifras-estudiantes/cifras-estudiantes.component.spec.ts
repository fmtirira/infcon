import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CifrasEstudiantesComponent } from './cifras-estudiantes.component';

describe('CifrasEstudiantesComponent', () => {
  let component: CifrasEstudiantesComponent;
  let fixture: ComponentFixture<CifrasEstudiantesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CifrasEstudiantesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CifrasEstudiantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
