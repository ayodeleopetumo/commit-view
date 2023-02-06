import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";

import { CommitService } from "../../../../core/services/commit-service/commit-service.service";
import { CommitDetailsResponse } from "../../../../core/models/commit-response.model";
import { Observable } from "rxjs";

@Component({
  selector: 'app-commit-details',
  templateUrl: './commit-details.component.html',
  styleUrls: ['./commit-details.component.css']
})
export class CommitDetailsComponent implements OnInit {
  commitDetails$!: Observable<CommitDetailsResponse>;

  constructor(private router: Router, private commitService: CommitService, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    const commitId = this.activatedRoute.snapshot.paramMap.get('sha')!;
    this.commitDetails$ = this.commitService.getCommitDetails(commitId);
  }

  goBackToOverview() {
    this.router.navigateByUrl('/')
  }

  goToUrl(commitUrl: string) {
    window.open(commitUrl, 'blank');
  }
}
