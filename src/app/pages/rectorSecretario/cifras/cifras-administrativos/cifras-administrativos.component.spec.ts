import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CifrasAdministrativosComponent } from './cifras-administrativos.component';

describe('CifrasAdministrativosComponent', () => {
  let component: CifrasAdministrativosComponent;
  let fixture: ComponentFixture<CifrasAdministrativosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CifrasAdministrativosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CifrasAdministrativosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
