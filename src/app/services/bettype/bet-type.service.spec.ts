import { TestBed } from '@angular/core/testing';

import { BetTypeService } from './bet-type.service';

describe('BetTypeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BetTypeService = TestBed.get(BetTypeService);
    expect(service).toBeTruthy();
  });
});
