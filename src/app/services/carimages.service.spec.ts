import { TestBed } from '@angular/core/testing';

import { CarimagesService } from './carimages.service';

describe('CarimagesService', () => {
  let service: CarimagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarimagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
