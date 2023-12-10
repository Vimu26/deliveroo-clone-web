import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmoothiesShakesJuiceComponent } from './smoothies-shakes-juice.component';

describe('SmoothiesShakesJuiceComponent', () => {
  let component: SmoothiesShakesJuiceComponent;
  let fixture: ComponentFixture<SmoothiesShakesJuiceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SmoothiesShakesJuiceComponent]
    });
    fixture = TestBed.createComponent(SmoothiesShakesJuiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
