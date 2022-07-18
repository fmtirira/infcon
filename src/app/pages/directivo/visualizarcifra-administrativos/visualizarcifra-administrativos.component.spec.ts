import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarcifraAdministrativosComponent } from './visualizarcifra-administrativos.component';

describe('VisualizarcifraAdministrativosComponent', () => {
  let component: VisualizarcifraAdministrativosComponent;
  let fixture: ComponentFixture<VisualizarcifraAdministrativosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisualizarcifraAdministrativosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizarcifraAdministrativosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
