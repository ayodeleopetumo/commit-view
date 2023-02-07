import { TestBed } from '@angular/core/testing';

import { CommitService } from './commit-service.service';
import { CommitDetailsResponse, CommitResponse } from "../../models/commit-response.model";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";

describe('CommitServiceService', () => {
  let service: CommitService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(CommitService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get commits', () => {
    const since = '2022-01-01';
    const until = '2022-12-31';
    const page = 1;
    const mockCommitResponse = [{
      sha: 'abcdefg',
      commit: {
        author: {
          name: 'John Doe',
          email: 'johndoe@example.com',
          date: '2022-01-01T00:00:00Z'
        },
        message: 'Initial commit'
      }
    }] as unknown as CommitResponse[];

    service.getCommits(since, until, page).subscribe(commits => {
      expect(commits).toEqual(mockCommitResponse);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}?since=${since}&until=${until}&page=${page}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockCommitResponse);
  });

  it('should get commit details', () => {
    const commitHash = 'abcdefg';
    const mockCommitDetailsResponse = {
      sha: 'abcdefg',
      commit: {
        author: {
          name: 'John Doe',
          email: 'johndoe@example.com',
          date: '2022-01-01T00:00:00Z'
        },
        message: 'Initial commit'
      }
    } as unknown as CommitDetailsResponse;

    service.getCommitDetails(commitHash).subscribe(commitDetails => {
      expect(commitDetails).toEqual(mockCommitDetailsResponse);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/${commitHash}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockCommitDetailsResponse);
  });
});
