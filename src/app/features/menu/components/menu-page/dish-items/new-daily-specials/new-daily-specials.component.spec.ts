import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewDailySpecialsComponent } from './new-daily-specials.component';

describe('NewDailySpecialsComponent', () => {
  let component: NewDailySpecialsComponent;
  let fixture: ComponentFixture<NewDailySpecialsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewDailySpecialsComponent]
    });
    fixture = TestBed.createComponent(NewDailySpecialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
