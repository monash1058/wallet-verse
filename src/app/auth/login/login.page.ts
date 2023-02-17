import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { FcmService } from 'src/app/shared/service/fcm.service';
import { ToastrCustomService } from 'src/app/shared/service/toastr.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  userName: any;
  password: any;
  formData: FormGroup;
  type = true;
  constructor(private fcmService: FcmService, private authService: AuthService, private toastr: ToastrCustomService, private router: Router, private fb: FormBuilder) { }

  ngOnInit() {
    // this.fcmService.initPush(); 
    this.formData = this.fb.group({
      mob: ['', [Validators.required, Validators.pattern("^((\\+65-?)|0)?[0-9]{8}$")]],
      password: ['', [Validators.required, Validators.pattern("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$#!_%*?&])[A-Za-z\d$@$!%*?&].{7,30}")]]
    });
  }
  changeType() {
    this.type = !this.type;
  }
  onClickSubmit(data: any) {
    if (!this.formData.valid) {
      this.formData.markAllAsTouched();
      return;
    }
    const path = "api/user/login";
    let datas = {
      'phone': this.formData.value.mob,
      'password': this.formData.value.password,
      'fcmToken': localStorage.getItem('fcmToken')
    }
    this.authService.postMethod(path, datas).pipe(take(1)).subscribe((res: any) => {
      if (res.success) {
        localStorage.setItem('_id', res.data._id);
        localStorage.setItem('success', res.success);
        localStorage.setItem('amount', res.data.amount);
        this.toastr.success("Login Successfully");
        this.router.navigate(['../../../admin/tab-nav/dashboard']);
        this.formData.reset();
      } else {
        this.toastr.error(res.message);
      }
    });
  }
  numericOnly(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
}
