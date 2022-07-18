import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogpConfirmarComponent } from './dialogp-confirmar.component';

describe('DialogpConfirmarComponent', () => {
  let component: DialogpConfirmarComponent;
  let fixture: ComponentFixture<DialogpConfirmarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogpConfirmarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogpConfirmarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
