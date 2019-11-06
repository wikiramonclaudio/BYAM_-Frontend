import { TestBed } from '@angular/core/testing';

import { UploadModalService } from './upload-modal.service';

describe('UploadModalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UploadModalService = TestBed.get(UploadModalService);
    expect(service).toBeTruthy();
  });
});
