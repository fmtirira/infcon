import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogrecseceditarComponent } from './dialogrecseceditar.component';

describe('DialogrecseceditarComponent', () => {
  let component: DialogrecseceditarComponent;
  let fixture: ComponentFixture<DialogrecseceditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogrecseceditarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogrecseceditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
