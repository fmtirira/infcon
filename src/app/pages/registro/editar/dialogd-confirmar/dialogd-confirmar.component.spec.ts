import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogdConfirmarComponent } from './dialogd-confirmar.component';

describe('DialogdConfirmarComponent', () => {
  let component: DialogdConfirmarComponent;
  let fixture: ComponentFixture<DialogdConfirmarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogdConfirmarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogdConfirmarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
