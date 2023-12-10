import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnacksSidesComponent } from './snacks-sides.component';

describe('SnacksSidesComponent', () => {
  let component: SnacksSidesComponent;
  let fixture: ComponentFixture<SnacksSidesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SnacksSidesComponent]
    });
    fixture = TestBed.createComponent(SnacksSidesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
