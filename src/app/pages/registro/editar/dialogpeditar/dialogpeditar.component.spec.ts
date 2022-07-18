import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogpeditarComponent } from './dialogpeditar.component';

describe('DialogpeditarComponent', () => {
  let component: DialogpeditarComponent;
  let fixture: ComponentFixture<DialogpeditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogpeditarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogpeditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
