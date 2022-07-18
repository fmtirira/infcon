import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogieditarComponent } from './dialogieditar.component';

describe('DialogieditarComponent', () => {
  let component: DialogieditarComponent;
  let fixture: ComponentFixture<DialogieditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogieditarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogieditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
