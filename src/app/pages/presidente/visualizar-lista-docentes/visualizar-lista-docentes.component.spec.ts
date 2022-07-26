import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarListaDocentesComponent } from './visualizar-lista-docentes.component';

describe('VisualizarListaDocentesComponent', () => {
  let component: VisualizarListaDocentesComponent;
  let fixture: ComponentFixture<VisualizarListaDocentesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisualizarListaDocentesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizarListaDocentesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
