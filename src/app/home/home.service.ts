import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CommonService } from '../shared/service/common.service';
import { ToastrCustomService } from '../shared/service/toastr.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  baseUrl: any = environment.backendApi;
  goldUrl: any = environment.goldApi;
  errorOccured = new BehaviorSubject<boolean>(false);
  headers = new HttpHeaders({"x-access-token": "goldapi-q364x8drlgvsdpdw-io"});
  constructor(
    private commonService: CommonService,
    private route: Router,
    private toastrService: ToastrCustomService,
    private http: HttpClient
  ) { }

  postMethod(path: any, dat: any) {
    return this.http.post(this.baseUrl + path, dat, { headers: { skip: 'true' } }).pipe(
      map(data => {
        this.commonService.loadingSpinnerCall(false);
        return data;
      })
    );
  }
  postAuthMethod(path: any, dat: any) {
    return this.http.post(this.baseUrl + path, dat).pipe(
      map(data => {
        this.commonService.loadingSpinnerCall(false);
        return data;
      })
    );
  }
  getMethod(path: any) {
    return this.http.get(this.baseUrl + path, { headers: { skip: 'true' } }).pipe(
      map(data => {
        this.commonService.loadingSpinnerCall(false);
        return data;
      })
    );
  }
  getGoldMethod(path: any) {
    return this.http.get(this.goldUrl + path, {headers: this.headers}).pipe(
      map(data => {
        this.commonService.loadingSpinnerCall(false);
        return data;
      })
    );
  }
}
