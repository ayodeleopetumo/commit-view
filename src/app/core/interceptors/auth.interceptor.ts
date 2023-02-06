import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let authRequest;
    const authToken: string = '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'

    authRequest = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${authToken}`),
    });

    return next.handle(authRequest);
  }
}
