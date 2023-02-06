import { NgModule } from '@angular/core';

import { CommitDetailsComponent } from './components/commit-details/commit-details.component';
import { RouterModule, Routes } from "@angular/router";
import { CommonModule } from "@angular/common";

const routes: Routes = [
  {path: '', component: CommitDetailsComponent}
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [],
  declarations: [CommitDetailsComponent],
  providers: [],
})
export class CommitDetailsModule {
}
