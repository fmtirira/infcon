import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogrecsecreConfirmarComponent } from './dialogrecsecre-confirmar.component';

describe('DialogrecsecreConfirmarComponent', () => {
  let component: DialogrecsecreConfirmarComponent;
  let fixture: ComponentFixture<DialogrecsecreConfirmarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogrecsecreConfirmarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogrecsecreConfirmarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
