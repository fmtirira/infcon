import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarcifraDocentesComponent } from './visualizarcifra-docentes.component';

describe('VisualizarcifraDocentesComponent', () => {
  let component: VisualizarcifraDocentesComponent;
  let fixture: ComponentFixture<VisualizarcifraDocentesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisualizarcifraDocentesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizarcifraDocentesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
