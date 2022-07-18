import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabsrecComponent } from './tabsrec.component';

describe('TabsrecComponent', () => {
  let component: TabsrecComponent;
  let fixture: ComponentFixture<TabsrecComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabsrecComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabsrecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
