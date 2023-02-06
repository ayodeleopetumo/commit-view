import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { CommitDetailsResponse, CommitResponse } from "../../models/commit-response.model";

@Injectable({
  providedIn: 'root'
})
export class CommitService {
  private apiUrl = 'https://api.github.com/repos/angular/angular/commits';

  constructor(private http: HttpClient) { }

  getCommits(since: string, until: string, page: number = 1): Observable<CommitResponse[]>{
    return this.http.get<CommitResponse[]>(`${this.apiUrl}?since=${since}&until=${until}&page=${page}`);
  }

  getCommitDetails(commitHash: string): Observable<CommitDetailsResponse> {
    return this.http.get<CommitDetailsResponse>(`${this.apiUrl}/${commitHash}`)
  }
}
