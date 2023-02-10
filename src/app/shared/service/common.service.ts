import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';  
const EXCEL_EXTENSION = '.xlsx'; 

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  navToggleHandle: any = new Subject<any>();
  loadingSpinner: any = new BehaviorSubject(false);
  pinToAddress: any = new BehaviorSubject(null);
  baseUrl: any = environment.backendApi;
  paymentDetails: any = new BehaviorSubject(null);
  selectedData = this.paymentDetails.asObservable();
  idDetails: any = new BehaviorSubject(null);
 
  constructor(
    private http: HttpClient,
  ) {}

  loadingSpinnerCall(val: any) {
    this.loadingSpinner.next(val);
  }
  paymentData(val: any) {
    this.paymentDetails.next(val)
  }
  idData(val: any) {
    this.idDetails.next(val)
  }
  postMethod(path?: any, dat?: any) {
    return this.http.post(this.baseUrl + path, dat).pipe(
      map(data => {
        this.loadingSpinnerCall(false);
        return data;
      })
    );
  }
  getLocation() {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resp => {
          resolve({lng: resp.coords.longitude, lat: resp.coords.latitude});
        },
        err => {
          reject(err);
        });
    });
  }
  // getMethod(path?: any) {
  //   return this.http.get(this.baseUrl + path).pipe(
  //     map(data => {
  //       this.loadingSpinnerCall(false);
  //       return data;
  //     })
  //   );
  // }
  // getWithoutTokenSpinner(path: any) {
  //   return this.http.get(this.baseUrl + path, {headers: {skip: 'true', spinner: 'false'}}).pipe(
  //     map(data => {
  //       return data;
  //     })
  //   );
  // }
  // postWithoutTokenSpinner(path: any, dat: any) {
  //   return this.http.post(this.baseUrl + path, dat, {headers: {skip: 'true', spinner: 'false'}}).pipe(
  //     map(data => {
  //       return data;
  //     })
  //   );
  // }
  // postWithoutSpinner(path: any, dat: any) {
  //   return this.http.post(this.baseUrl + path, dat, {headers: {search: 'true'}}).pipe(
  //     map(data => {
  //       return data;
  //     })
  //   );
  // }

  // getWithoutLoading(path?: any) {
  //   return this.http.get(this.baseUrl + path, { headers: { skip: 'true' }}).pipe(
  //     map(data => {
  //       this.commonService.loadingSpinnerCall(false);
  //       return data;
  //     })
  //   );
  // }
  // postWithoutLoading(path?: any, dat?: any) {
  //   return this.http.post(this.baseUrl + path, dat, { headers: { skip: 'true' }}).pipe(
  //     map(data => {
  //       this.commonService.loadingSpinnerCall(false);
  //       return data;
  //     })
  //   );
  // }
  // patchMethod(path?: any, dat?: any) {
  //   return this.http.patch(this.baseUrl + path, dat).pipe(
  //     map(data => {
  //       this.commonService.loadingSpinnerCall(false);
  //       return data;
  //     })
  //   );
  // }
}
