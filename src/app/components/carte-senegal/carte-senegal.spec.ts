import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarteSenegal } from './carte-senegal';

describe('CarteSenegal', () => {
  let component: CarteSenegal;
  let fixture: ComponentFixture<CarteSenegal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarteSenegal],
    }).compileComponents();

    fixture = TestBed.createComponent(CarteSenegal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
