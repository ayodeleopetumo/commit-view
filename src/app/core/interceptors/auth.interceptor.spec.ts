import { HttpHandler, HttpRequest } from "@angular/common/http";

import { AuthInterceptor } from "./auth.interceptor";

describe('AuthInterceptor', () => {
  let interceptor: AuthInterceptor;
  let next: HttpHandler;
  let modifiedRequest: HttpRequest<any>;

  beforeEach(() => {
    interceptor = new AuthInterceptor();
    next = { handle: jasmine.createSpy('handleSpy').and.callFake((req) => modifiedRequest = req )}
  });

  it('should add the authorization header to the request', () => {
    const req = new HttpRequest('GET', 'url');
    interceptor.intercept(req, next);

    const expected = req.clone({
      headers: req.headers.set('Authorization', `Bearer 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`),
    });

    expect(next.handle).toHaveBeenCalledWith(expected);
    expect(modifiedRequest.headers.get('Authorization')).toEqual('Bearer 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');
  });
});
