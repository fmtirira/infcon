import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarListaEstudiantesComponent } from './visualizar-lista-estudiantes.component';

describe('VisualizarListaEstudiantesComponent', () => {
  let component: VisualizarListaEstudiantesComponent;
  let fixture: ComponentFixture<VisualizarListaEstudiantesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisualizarListaEstudiantesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizarListaEstudiantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
