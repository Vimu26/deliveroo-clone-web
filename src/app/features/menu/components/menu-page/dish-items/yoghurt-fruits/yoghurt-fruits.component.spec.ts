import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YoghurtFruitsComponent } from './yoghurt-fruits.component';

describe('YoghurtFruitsComponent', () => {
  let component: YoghurtFruitsComponent;
  let fixture: ComponentFixture<YoghurtFruitsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [YoghurtFruitsComponent]
    });
    fixture = TestBed.createComponent(YoghurtFruitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
