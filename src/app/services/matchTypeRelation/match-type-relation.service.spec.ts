import { TestBed } from '@angular/core/testing';

import { MatchTypeRelationService } from './match-type-relation.service';

describe('MatchTypeRelationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MatchTypeRelationService = TestBed.get(MatchTypeRelationService);
    expect(service).toBeTruthy();
  });
});
