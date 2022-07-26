import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarListaRepresentantesComponent } from './visualizar-lista-representantes.component';

describe('VisualizarListaRepresentantesComponent', () => {
  let component: VisualizarListaRepresentantesComponent;
  let fixture: ComponentFixture<VisualizarListaRepresentantesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisualizarListaRepresentantesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizarListaRepresentantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
