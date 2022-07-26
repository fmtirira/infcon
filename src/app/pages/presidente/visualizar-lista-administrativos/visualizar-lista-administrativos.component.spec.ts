import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarListaAdministrativosComponent } from './visualizar-lista-administrativos.component';

describe('VisualizarListaAdministrativosComponent', () => {
  let component: VisualizarListaAdministrativosComponent;
  let fixture: ComponentFixture<VisualizarListaAdministrativosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisualizarListaAdministrativosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizarListaAdministrativosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
