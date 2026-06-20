import { TestBed } from '@angular/core/testing';

import { Geolocalisation } from './geolocalisation';

describe('Geolocalisation', () => {
  let service: Geolocalisation;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Geolocalisation);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
