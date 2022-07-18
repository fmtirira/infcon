import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogiConfirmarComponent } from './dialogi-confirmar.component';

describe('DialogiConfirmarComponent', () => {
  let component: DialogiConfirmarComponent;
  let fixture: ComponentFixture<DialogiConfirmarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogiConfirmarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogiConfirmarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
