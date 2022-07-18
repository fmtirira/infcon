import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialognivelComponent } from './dialognivel.component';

describe('DialognivelComponent', () => {
  let component: DialognivelComponent;
  let fixture: ComponentFixture<DialognivelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialognivelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialognivelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
