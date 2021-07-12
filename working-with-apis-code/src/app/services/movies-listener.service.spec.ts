import { TestBed } from '@angular/core/testing';

import { MoviesListenerService } from './movies-listener.service';

describe('MoviesListenerService', () => {
  let service: MoviesListenerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MoviesListenerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
