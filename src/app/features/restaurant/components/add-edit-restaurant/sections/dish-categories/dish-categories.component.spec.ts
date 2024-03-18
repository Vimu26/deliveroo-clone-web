import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DishCategoriesComponent } from './dish-categories.component';

describe('DishCategoriesComponent', () => {
  let component: DishCategoriesComponent;
  let fixture: ComponentFixture<DishCategoriesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DishCategoriesComponent]
    });
    fixture = TestBed.createComponent(DishCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
