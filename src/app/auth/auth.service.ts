import { HttpClient } from '@angular/common/http';
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
export class AuthService {
  baseUrl: any = environment.backendApi;
  errorOccured = new BehaviorSubject<boolean>(false);
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
  //OTP Validations
  otpValidation(data: any) {
    let url = `${environment.backendApi}api/v1/auth/verifyEmail`
    return this.http.post(url, data).pipe(
      map(data => {
        this.commonService.loadingSpinnerCall(false);
        return data
      })
    )
  }
  //Resend OTP Api
  resendOtp(data: any) {
    let url = `${environment.backendApi}api/v1/auth/sendOtp`
    return this.http.post(url, data).pipe(
      map((data: any) => {
        this.commonService.loadingSpinnerCall(false);
        this.toastrService.success(data.message);
        return data
      })
    )
  }
  getErrorOccuredStatus(): Observable<any> {
    return this.errorOccured;
  }
  //ChangePassword submit
  changePassword(data: any) {
    let url = `${environment.backendApi}api/v1/auth/resetPasswordForAdmin`
    return this.http.post(url, data, { headers: { skip: 'true' } }).pipe(
      map((data: any) => {
        this.commonService.loadingSpinnerCall(false);
        return data
      })
    )
  }
  //ChangePassword submit
  changePasswordClinician(data: any) {
    let url = `${environment.backendApi}api/v1/auth/resetPasswordForClinician`
    return this.http.post(url, data, { headers: { skip: 'true' } }).pipe(
      map((data: any) => {
        this.commonService.loadingSpinnerCall(false);
        return data
      })
    )
  }
  getMethod(path: any) {
    return this.http.get(this.baseUrl + path, { headers: { skip: 'true' } }).pipe(
      map(data => {
        this.commonService.loadingSpinnerCall(false);
        return data;
      })
    );
  }
}
