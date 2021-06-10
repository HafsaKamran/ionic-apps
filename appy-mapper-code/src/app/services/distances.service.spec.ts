import { TestBed } from '@angular/core/testing';

import { DistancesService } from './distances.service';

describe('DistancesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DistancesService = TestBed.get(DistancesService);
    expect(service).toBeTruthy();
  });
});
