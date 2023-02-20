import { Injectable } from '@angular/core';
import { HttpHeaders, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { of, throwError } from "rxjs";
import { retry, catchError, map, tap } from 'rxjs/operators';
import { ToastrCustomService } from '../service/toastr.service';
import { CommonService } from '../service/common.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private route: Router,
    private commonService: CommonService,
    private toastService: ToastrCustomService,
  ) {}
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    
      if (req.headers.get('spinner') === 'false') {
        this.commonService.loadingSpinnerCall(false);
      } else {
        this.commonService.loadingSpinnerCall(true);
      }
      if (req.headers.get('search') !== 'true') {
        this.commonService.loadingSpinnerCall(true);
      }
      const authorization = localStorage.getItem('token');
      console.log(authorization)
      if (!authorization) {
        this.route.navigateByUrl('/auth');
      } else {
        req = req.clone({
          headers: new HttpHeaders({
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'content-type',
            'token': `${authorization}`,
            'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9'
          })
        });
      }
    // Sending request***
    return next.handle(req).pipe(
      catchError((error) => {
        this.commonService.loadingSpinnerCall(false);
        let handled: boolean = false;
        if (error instanceof HttpErrorResponse) {
          if (error.error instanceof ErrorEvent) {
            console.error("Error Event");
          } else {
            switch (error.status) {
              case 400:      //login
                // this.authservice.setErrorOccured();
                handled = true;
                break;
              case 401:      //login
                this.toastService.error(error.error.message)
                // this.authservice.setErrorOccured();
                handled = true;
                if (error.error.message === 'Token has been expired') {
                  this.route.navigateByUrl('/auth');
                }
                break;
              case 403:     //forbidden
                this.route.navigateByUrl('/auth');
                handled = true;
                break;
              case 404:      //login
                handled = true;
                break;
              case 422:     //forbidden
                handled = true;
                break;
              case 500:     //forbidden
                handled = true;
                break;
            }
            this.toastService.error(error.error.message);
          }
        } else {
          console.error("Other Unhandled Errors from server");
        }
        if (handled) {
          return of(error);
        } else {
          return throwError(error);
        }
      })
    );
  }

}
