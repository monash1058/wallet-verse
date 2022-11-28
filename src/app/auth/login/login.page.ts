import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/Authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  userName: string;
  password: string;
  formData: FormGroup;

  constructor(private authService : AuthenticationService, private router : Router,private fb: FormBuilder,) { }

  ngOnInit() {
   this.formData = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]]
   });
  }

  onClickSubmit(data: any) {
     this.userName = data.userName;
     this.password = data.password;
     window.onpopstate = function (e) { window.history.forward(); }
     this.authService.login(this.userName, this.password)
        .subscribe( data => { 
           console.log("Is Login Success: " + data); 
          if(data){
            this.router.navigate(['../../../tab-nav/dashboard']); 
          } else {
            alert('UserName and Password is Incorrect');
          }
     });
  }
}
