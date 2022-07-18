import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarInstitucionesComponent } from './visualizar-instituciones.component';

describe('VisualizarInstitucionesComponent', () => {
  let component: VisualizarInstitucionesComponent;
  let fixture: ComponentFixture<VisualizarInstitucionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisualizarInstitucionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizarInstitucionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
