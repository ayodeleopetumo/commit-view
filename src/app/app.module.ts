import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, RouterOutlet, Routes } from "@angular/router";

import { CoreModule } from "./core/core.module";
import { CommitOverviewModule } from "./features/commit-overview/commit-overview.module";
import { AppComponent } from './app.component';
import { CommitOverviewComponent } from './features/commit-overview/components/commit-overview.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', component: CommitOverviewComponent}
]

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    RouterOutlet,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    CoreModule,
    CommitOverviewModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
