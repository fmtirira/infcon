import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarListaInstitucionesComponent } from './visualizar-lista-instituciones.component';

describe('VisualizarListaInstitucionesComponent', () => {
  let component: VisualizarListaInstitucionesComponent;
  let fixture: ComponentFixture<VisualizarListaInstitucionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisualizarListaInstitucionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizarListaInstitucionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
