import { TestBed } from '@angular/core/testing';

import { MinibyamTeamsService } from './minibyam-teams.service';

describe('MinibyamTeamsService', () => {
  let service: MinibyamTeamsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MinibyamTeamsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
