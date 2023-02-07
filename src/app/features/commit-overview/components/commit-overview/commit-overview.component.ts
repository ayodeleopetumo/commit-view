import { Component, OnInit } from '@angular/core';
import { map, Observable } from "rxjs";

import { CommitService } from "../../../../core/services/commit-service/commit-service.service";
import { CommitResponse } from "../../../../core/models/commit-response.model";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: 'app-commit-overview',
  templateUrl: './commit-overview.component.html',
  styleUrls: ['./commit-overview.component.css']
})
export class CommitOverviewComponent implements OnInit {
  today = new Date().toISOString();
  page = 1;
  commits$!: Observable<CommitResponse[]>;
  range = new FormGroup({
    start: new FormControl<Date>(this.getOneMonthFromCurrentDate()),
    end: new FormControl<Date>(new Date(), {validators: Validators.required}),
  });

  constructor(private commitService: CommitService, private router: Router) {
  }

  ngOnInit() {
    const monthAgo = this.getOneMonthFromCurrentDate().toISOString();
    this.getCommits(monthAgo, this.today);
  }

  getCommits(since: string, until: string, page?: number) {
    this.commits$ = this.commitService.getCommits(since, until, page).pipe(map(commits =>
      commits.sort((commitA, commitB) =>
        // @ts-ignore
        new Date(commitB.commit.author.date) - new Date(commitA.commit.author.date)
    )));
  }

  getOneMonthFromCurrentDate() {
    const date = new Date();
    date.setMonth(date.getMonth() - 1);
    date.setHours(0, 0, 0, 0);
    return date;
  }

  getCommitInRange() {
    if (this.range.valid) {
      const since = this.range.get('start')?.value!?.toISOString();
      const until = this.range.get('end')?.value!?.toISOString();
      this.getCommits(since, until);
    }
  }

  fetchPage(page: number) {
    this.page = page;
    const since = this.range.get('start')?.value!?.toISOString();
    const until = this.range.get('end')?.value!?.toISOString();
    this.getCommits(since, until, page);
  }

  goToCommitDetails(commitSha: string) {
    this.router.navigateByUrl(`commit-details/${commitSha}`);
  }
}
