import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CifrasadminiEditarComponent } from './cifrasadmini-editar.component';

describe('CifrasadminiEditarComponent', () => {
  let component: CifrasadminiEditarComponent;
  let fixture: ComponentFixture<CifrasadminiEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CifrasadminiEditarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CifrasadminiEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
