import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CifrasestudiEditarComponent } from './cifrasestudi-editar.component';

describe('CifrasestudiEditarComponent', () => {
  let component: CifrasestudiEditarComponent;
  let fixture: ComponentFixture<CifrasestudiEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CifrasestudiEditarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CifrasestudiEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
