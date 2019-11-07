import { TestBed } from '@angular/core/testing';

import { TableSubscriptionService } from './table-subscription.service';

describe('TableSubscriptionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TableSubscriptionService = TestBed.get(TableSubscriptionService);
    expect(service).toBeTruthy();
  });
});
