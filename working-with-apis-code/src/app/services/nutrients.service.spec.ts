import { TestBed } from '@angular/core/testing';

import { NutrientsService } from './nutrients.service';

describe('NutrientsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NutrientsService = TestBed.get(NutrientsService);
    expect(service).toBeTruthy();
  });
});
