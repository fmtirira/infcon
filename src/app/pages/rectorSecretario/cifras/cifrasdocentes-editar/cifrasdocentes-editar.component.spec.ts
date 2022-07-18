import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CifrasdocentesEditarComponent } from './cifrasdocentes-editar.component';

describe('CifrasdocentesEditarComponent', () => {
  let component: CifrasdocentesEditarComponent;
  let fixture: ComponentFixture<CifrasdocentesEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CifrasdocentesEditarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CifrasdocentesEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
