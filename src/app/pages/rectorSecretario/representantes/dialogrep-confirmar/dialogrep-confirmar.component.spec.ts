import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogrepConfirmarComponent } from './dialogrep-confirmar.component';

describe('DialogrepConfirmarComponent', () => {
  let component: DialogrepConfirmarComponent;
  let fixture: ComponentFixture<DialogrepConfirmarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogrepConfirmarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogrepConfirmarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
