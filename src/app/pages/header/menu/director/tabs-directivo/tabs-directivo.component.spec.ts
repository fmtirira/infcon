import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabsDirectivoComponent } from './tabs-directivo.component';

describe('TabsDirectivoComponent', () => {
  let component: TabsDirectivoComponent;
  let fixture: ComponentFixture<TabsDirectivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabsDirectivoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabsDirectivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
