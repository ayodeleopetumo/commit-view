import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from "./components/header/header.component";
import { MatToolbarModule } from "@angular/material/toolbar";
import { CommitService } from "./services/commit-service/commit-service.service";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthInterceptor } from "./interceptors/auth.interceptor";

const CORE_COMPONENTS = [
  HeaderComponent
]

@NgModule({
  declarations: [
    ...CORE_COMPONENTS
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
  ],
  exports: [
    ...CORE_COMPONENTS
  ],
  providers: [
    CommitService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    }
  ]
})
export class CoreModule { }
