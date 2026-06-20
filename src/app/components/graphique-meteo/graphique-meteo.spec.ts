import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphiqueMeteo } from './graphique-meteo';

describe('GraphiqueMeteo', () => {
  let component: GraphiqueMeteo;
  let fixture: ComponentFixture<GraphiqueMeteo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GraphiqueMeteo],
    }).compileComponents();

    fixture = TestBed.createComponent(GraphiqueMeteo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
