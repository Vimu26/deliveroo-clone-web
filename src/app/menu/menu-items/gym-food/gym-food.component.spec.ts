import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GymFoodComponent } from './gym-food.component';

describe('GymFoodComponent', () => {
  let component: GymFoodComponent;
  let fixture: ComponentFixture<GymFoodComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GymFoodComponent]
    });
    fixture = TestBed.createComponent(GymFoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
