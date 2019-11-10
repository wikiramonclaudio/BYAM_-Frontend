import { TestBed } from '@angular/core/testing';

import { OptionTypeRelationService } from './option-type-relation.service';

describe('OptionTypeRelationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OptionTypeRelationService = TestBed.get(OptionTypeRelationService);
    expect(service).toBeTruthy();
  });
});
