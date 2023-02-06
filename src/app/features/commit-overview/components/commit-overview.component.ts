import { Component, OnInit } from '@angular/core';
import { map, Observable } from "rxjs";

import { CommitService } from "../../../core/services/commit-service/commit-service.service";
import { CommitResponse } from "../../../core/models/commit-response.model";
import { FormControl, FormGroup } from "@angular/forms";

@Component({
  selector: 'app-commit-overview',
  templateUrl: './commit-overview.component.html',
  styleUrls: ['./commit-overview.component.css']
})
export class CommitOverviewComponent implements OnInit {
  page = 1;
  commits!: CommitResponse[];
  range = new FormGroup({
    start: new FormControl<Date>(this.getOneMonthFromCurrentDate()),
    end: new FormControl<Date>(new Date()),
  });

  constructor(private commitService: CommitService) {
  }

  ngOnInit() {
    const today = new Date().toISOString();
    const monthAgo = this.getOneMonthFromCurrentDate().toISOString()
    this.getCommits(monthAgo, today);
  }

  getCommits(since: string, until: string, page?: number) {
    this.commitService.getCommits(since, until, page).pipe(map(commits => {
      return commits.sort((commitA, commitB) => {
          // @ts-ignore
          return new Date(commitB.commit.author.date) - new Date(commitA.commit.author.date)
        }
      )
    })).subscribe(commits => this.commits = commits);
  }

  getOneMonthFromCurrentDate() {
    const date = new Date();
    date.setMonth(date.getMonth() - 1);
    date.setHours(0, 0, 0, 0);
    return date;
  }

  getNew(e: any) {
    if (this.range.valid) {
      const since = this.range.get('start')?.value!?.toISOString();
      const until = this.range.get('end')?.value!?.toISOString();
      console.log({since, until})
      this.getCommits(since, until);
    }
  }

  fetchPage(page: number) {
    this.page = page;
    const since = this.range.get('start')?.value!?.toISOString();
    const until = this.range.get('end')?.value!?.toISOString();
    console.log(this.range.value, page);
    this.getCommits(since, until, page);
  }
}
