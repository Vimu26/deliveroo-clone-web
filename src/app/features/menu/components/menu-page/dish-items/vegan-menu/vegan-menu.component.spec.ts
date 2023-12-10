import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VeganMenuComponent } from './vegan-menu.component';

describe('VeganMenuComponent', () => {
  let component: VeganMenuComponent;
  let fixture: ComponentFixture<VeganMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VeganMenuComponent]
    });
    fixture = TestBed.createComponent(VeganMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
