import { ComponentFixture, TestBed } from '@angular/core/testing';

import { of } from "rxjs";
import { Router } from "@angular/router";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { HttpClientTestingModule } from "@angular/common/http/testing";

import { CommitOverviewComponent } from './commit-overview.component';
import { CommitResponse } from "../../../../core/models/commit-response.model";
import { CommitService } from "../../../../core/services/commit-service/commit-service.service";

describe('CommitOverviewComponent', () => {
  let component: CommitOverviewComponent;
  let fixture: ComponentFixture<CommitOverviewComponent>;
  let commitService: jasmine.SpyObj<CommitService>;
  let router: jasmine.SpyObj<Router>;

  const commitResponse: CommitResponse[] = [
    {
      sha: 'abc123',
      commit: {
        author: {
          date: '2022-02-10T00:00:00Z',
        },
        message: 'commit \n message'
      },
    },
    {
      sha: 'def456',
      commit: {
        author: {
          date: '2022-10-10T00:00:00Z',
        },
        message: 'commit \n message'
      },
    },
    {
      sha: 'def456',
      commit: {
        author: {
          date: '2023-01-10T00:00:00Z',
        },
        message: 'commit \n message'
      },
    },
  ] as CommitResponse[];

  beforeEach(async () => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl'])

    await TestBed.configureTestingModule({
      declarations: [ CommitOverviewComponent ],
      imports: [HttpClientTestingModule],
      providers: [
        { provide: CommitService, useValue: { getCommits: () => of([])} },
        { provide: Router, useValue: routerSpy },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommitOverviewComponent);
    component = fixture.componentInstance;
    commitService = TestBed.inject(CommitService) as jasmine.SpyObj<CommitService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getCommits with default range on init', () => {
    spyOn(commitService, 'getCommits').and.returnValue(of(commitResponse));
    const currentDate = component.today;
    const oneMonthAgo = component.getOneMonthFromCurrentDate().toISOString();

    component.ngOnInit();
    fixture.detectChanges();

    expect(commitService.getCommits).toHaveBeenCalledWith(oneMonthAgo, currentDate, undefined);
    component.commits$.subscribe(commits => {
      // @ts-ignore
      const sortedData = commitResponse.sort((a,b ) => b.commit.author.date - a.commit.author.date)
      expect(commits).toBe(sortedData);
    })
  });

  it('should navigate to the commit details page with the commit SHA', () => {
    component.goToCommitDetails('abc123');
    expect(router.navigateByUrl).toHaveBeenCalledWith('commit-details/abc123');
  });

  describe('getCommitInRange', () => {
    it('should not run getCommits if form is invalid', () => {
      spyOn(component, 'getCommits');
      component.range.setValue({ start: new Date(), end: null });

      fixture.detectChanges();

      component.getCommitInRange();
      expect(component.getCommits).not.toHaveBeenCalled();
    });

    it('should run getCommits if form is valid and call getCommits with correct arguments', () => {
      spyOn(component, 'getCommits');
      component.range.setValue({
        start: new Date(2022, 10, 10),
        end: new Date(2022, 10, 20)
      });

      fixture.detectChanges();

      component.getCommitInRange();
      expect(component.getCommits).toHaveBeenCalled();
      expect(component.getCommits).toHaveBeenCalledWith('2022-11-09T23:00:00.000Z', '2022-11-19T23:00:00.000Z');
    });
  });

  describe('fetchPage', () => {
    it('should set the page number', () => {
      component.fetchPage(2);
      expect(component.page).toBe(2);
    });

    it('should call getCommits with the correct arguments', () => {
      spyOn(component, 'getCommits');
      component.range.setValue({
        start: new Date(2022, 10, 10),
        end: new Date(2022, 10, 20)
      });
      component.fetchPage(2);
      expect(component.getCommits).toHaveBeenCalledWith('2022-11-09T23:00:00.000Z', '2022-11-19T23:00:00.000Z', 2);
    });
  });
});
