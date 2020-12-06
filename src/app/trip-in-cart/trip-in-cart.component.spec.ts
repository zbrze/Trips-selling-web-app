import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripInCartComponent } from './trip-in-cart.component';

describe('TripInCartComponent', () => {
  let component: TripInCartComponent;
  let fixture: ComponentFixture<TripInCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TripInCartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TripInCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
