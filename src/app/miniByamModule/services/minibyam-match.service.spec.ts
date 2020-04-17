import { TestBed } from '@angular/core/testing';

import { MinibyamMatchService } from './minibyam-match.service';

describe('MinibyamMatchService', () => {
  let service: MinibyamMatchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MinibyamMatchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
