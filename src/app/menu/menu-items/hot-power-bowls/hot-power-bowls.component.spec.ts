import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotPowerBowlsComponent } from './hot-power-bowls.component';

describe('HotPowerBowlsComponent', () => {
  let component: HotPowerBowlsComponent;
  let fixture: ComponentFixture<HotPowerBowlsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HotPowerBowlsComponent]
    });
    fixture = TestBed.createComponent(HotPowerBowlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
