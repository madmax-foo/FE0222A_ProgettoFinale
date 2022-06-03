import { HttpErrorResponse,  HttpEvent,  HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, finalize, Observable, tap, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { AuthService } from "../auth/auth.service";

@Injectable()
export class Authinterceptor implements HttpInterceptor{
token:string;
tenant:string;

constructor(private authSrv:AuthService){
  this.token = environment.adminToken;
  this.tenant = environment.adminTenant;
}
intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
     let ok: string;

let authReq: HttpRequest<any> = req.clone({headers: req.headers.set('Authorization',' Bearer ' + this.token)
.set('X-TENANT-ID', this.tenant)});

return next.handle(authReq).pipe(
  tap(
    event => {
      ok = event instanceof HttpErrorResponse ? 'succeeded' : ''
    },
    error => { }
  ),
  catchError((error: HttpErrorResponse) => {
    return throwError(error);
  }),
    finalize(() => {

    })
  );
}
}
