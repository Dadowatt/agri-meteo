import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndicateurRisque } from './indicateur-risque';

describe('IndicateurRisque', () => {
  let component: IndicateurRisque;
  let fixture: ComponentFixture<IndicateurRisque>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndicateurRisque],
    }).compileComponents();

    fixture = TestBed.createComponent(IndicateurRisque);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
