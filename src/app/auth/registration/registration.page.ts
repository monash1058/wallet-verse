import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { ToastrCustomService } from 'src/app/shared/service/toastr.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {
  username: any;
  password: any;
  formData: FormGroup;
  type = true;
  isOtp = false;
  constructor(private router : Router,private fb: FormBuilder, private authService: AuthService,private toastr: ToastrCustomService,) { }

  ngOnInit() {
   this.formData = this.fb.group({
    username: ['', [Validators.required]],
      mob: ['', [Validators.required,  Validators.pattern("^((\\+65-?)|0)?[0-9]{8}$")]],
      otp: ['',[Validators.required]],
      password: ['', [Validators.required, Validators.pattern("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$#!_%*?&])[A-Za-z\d$@$!%*?&].{7,30}")]]
   });
  }
  changeType() {
    this.type = !this.type;
  }

  verify(event){
    if(event.target.value.length == 8){
    const path = `api/user/verifyNumber/${event.target.value}`;
    this.authService.getMethod(path).pipe(take(1)).subscribe((res: any) => {
    this.toastr.success("OTP sent successfully");
     this.isOtp = true;
    });
    }
  }
  onClickSubmit(data: any) {
    if(!this.formData.valid) {
      this.formData.markAllAsTouched();
      return;
    }
     window.onpopstate = function (e) { window.history.forward(); }
     const path = "api/user/register";
     let datas = {
      'name': this.formData.value.username,
      "phone": this.formData.value.mob,
      "password": this.formData.value.password
   
    }
     this.authService.postMethod(path, datas).pipe(take(1)).subscribe((res: any) => {
      localStorage.setItem('_id', res.data._id);
      localStorage.setItem('success', res.success);
      localStorage.setItem('amount', res.data.amount);
      this.toastr.success("Registered Successfully");
       this.router.navigate(['../../../admin/tab-nav/dashboard']);
       this.formData.reset();
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
