import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestMeteo } from './test-meteo';

describe('TestMeteo', () => {
  let component: TestMeteo;
  let fixture: ComponentFixture<TestMeteo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestMeteo],
    }).compileComponents();

    fixture = TestBed.createComponent(TestMeteo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
