import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarRepresentantesComponent } from './visualizar-representantes.component';

describe('VisualizarRepresentantesComponent', () => {
  let component: VisualizarRepresentantesComponent;
  let fixture: ComponentFixture<VisualizarRepresentantesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisualizarRepresentantesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizarRepresentantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
