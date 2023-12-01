import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RainbowWrapsComponent } from './rainbow-wraps.component';

describe('RainbowWrapsComponent', () => {
  let component: RainbowWrapsComponent;
  let fixture: ComponentFixture<RainbowWrapsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RainbowWrapsComponent]
    });
    fixture = TestBed.createComponent(RainbowWrapsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
