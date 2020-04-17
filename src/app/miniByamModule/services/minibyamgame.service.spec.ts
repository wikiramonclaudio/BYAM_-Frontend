import { TestBed } from '@angular/core/testing';

import { MinibyamgameService } from './minibyamgame.service';

describe('MinibyamgameService', () => {
  let service: MinibyamgameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MinibyamgameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
