import { ActivatedRoute, Router } from "@angular/router";
import { of } from "rxjs";
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommitDetailsComponent } from './commit-details.component';
import { CommitService } from "../../../../core/services/commit-service/commit-service.service";
import { CommitDetailsResponse } from "../../../../core/models/commit-response.model";

describe('CommitDetailsComponent', () => {
  let component: CommitDetailsComponent;
  let fixture: ComponentFixture<CommitDetailsComponent>;
  let commitService: jasmine.SpyObj<CommitService>;
  let router: jasmine.SpyObj<Router>;
  let activatedRoute: jasmine.SpyObj<ActivatedRoute>;

  beforeEach(async () => {
    const commitServiceSpy = jasmine.createSpyObj("CommitService", ["getCommitDetails"]);
    const routerSpy = jasmine.createSpyObj("Router", ["navigateByUrl"]);

    await TestBed.configureTestingModule({
      declarations: [ CommitDetailsComponent ],
      providers: [
        { provide: CommitService, useValue: commitServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => 'abc123'}}} },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommitDetailsComponent);
    component = fixture.componentInstance;
    commitService = TestBed.inject(CommitService) as jasmine.SpyObj<CommitService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    activatedRoute = TestBed.inject(ActivatedRoute) as jasmine.SpyObj<ActivatedRoute>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should retrieve commit details from the service and assign it to commitDetails$", () => {
    const commitId = "abc123";
    const commitDetails = {
      commit: { message: "Initial commit", author: { name: 'name' } },
      author: {avatar_url: 'url'}
    } as CommitDetailsResponse;
    commitService.getCommitDetails.and.returnValue(of(commitDetails));

    component.ngOnInit();
    fixture.detectChanges();

    expect(commitService.getCommitDetails).toHaveBeenCalledWith(commitId);
    expect(component.commitDetails$).toBeTruthy();
  });

  it("should navigate back to the overview when calling goBackToOverview", () => {
    component.goBackToOverview();
    expect(router.navigateByUrl).toHaveBeenCalledWith("/");
  });

  it("should open a new tab with the provided commit URL when calling goToUrl", () => {
    const commitUrl = "https://github.com/user/repo/commit/commit123";
    spyOn(window, "open");

    component.goToUrl(commitUrl);
    expect(window.open).toHaveBeenCalledWith(commitUrl, "blank");
  });
});
