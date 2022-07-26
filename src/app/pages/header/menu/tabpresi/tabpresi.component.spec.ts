import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabpresiComponent } from './tabpresi.component';

describe('TabpresiComponent', () => {
  let component: TabpresiComponent;
  let fixture: ComponentFixture<TabpresiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabpresiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabpresiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
