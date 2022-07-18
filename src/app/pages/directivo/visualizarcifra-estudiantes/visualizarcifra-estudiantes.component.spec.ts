import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarcifraEstudiantesComponent } from './visualizarcifra-estudiantes.component';

describe('VisualizarcifraEstudiantesComponent', () => {
  let component: VisualizarcifraEstudiantesComponent;
  let fixture: ComponentFixture<VisualizarcifraEstudiantesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisualizarcifraEstudiantesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizarcifraEstudiantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
