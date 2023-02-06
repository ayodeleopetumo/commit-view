import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommitOverviewComponent } from './commit-overview.component';

describe('CommitOverviewComponent', () => {
  let component: CommitOverviewComponent;
  let fixture: ComponentFixture<CommitOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommitOverviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommitOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
