import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarPresidentesComponent } from './visualizar-presidentes.component';

describe('VisualizarPresidentesComponent', () => {
  let component: VisualizarPresidentesComponent;
  let fixture: ComponentFixture<VisualizarPresidentesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisualizarPresidentesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizarPresidentesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
