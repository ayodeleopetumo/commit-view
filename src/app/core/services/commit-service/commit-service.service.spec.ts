import { TestBed } from '@angular/core/testing';

import { CommitService } from './commit-service.service';

describe('CommitServiceService', () => {
  let service: CommitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
