import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { ToastrCustomService } from 'src/app/shared/service/toastr.service';
import { HomeService } from '../home.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  @ViewChild('fileInput') el: ElementRef;
  formData: FormGroup;
  logo: any;
  imgFile:any = null;
  usersData: any;
  check = false;
  constructor(private homeService: HomeService,private cd: ChangeDetectorRef, private toastr: ToastrCustomService, private router : Router,private fb: FormBuilder) { }

  ngOnInit() {
    this.formData = this.fb.group({
      name: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.pattern("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$#!_%*?&])[A-Za-z\d$@$!%*?&].{7,30}")]],
      // file: [null],
   });
  }
  ionViewWillEnter() {
    this.getDashboardData();
  }

  uploadFile(input) {
    if (input.files && input.files[0]) {
      if (input.files[0].type == 'image/png' || input.files[0].type == 'image/jpeg' || input.files[0].type == 'image/jpg') {
        let reader = new FileReader();
        reader.onload = (event: ProgressEvent) => {
          this.imgFile = (<FileReader>event.target).result;
        }
        reader.readAsDataURL(input.files[0]);
        this.logo = input.files[0];
      }
      else {
        this.toastr.warning("Please choose Image file");
      }
    }
  }

  onClickSubmit() {
      // var formData: any = new FormData();
      // formData.append('_id', localStorage.getItem('_id'));
      // formData.append('name', this.formData.get('name').value);
      // formData.append('password', this.formData.get('password').value);
      // formData.append('profileImage', this.logo);
      let datas = {
        '_id':localStorage.getItem('_id'),
        'name': this.formData.value.name,
        'password': this.formData.value.password
      }
      if(!this.formData.valid) {
        this.formData.markAllAsTouched();
        return;
      }
      const path = "api/user/editProfile";
      this.homeService.postMethod(path, datas).pipe(take(1)).subscribe((res: any) => {
        this.toastr.success(res.message);
        setTimeout(() => {
          localStorage.clear();
          this.router.navigate(['/auth/login']);
          this.toastr.success('Password Changed Successfully, Please Login');
        },5000);
      });
  }
  logout() {
    localStorage.clear();
    this.router.navigate(['/auth/login']);
    this.toastr.success('User Sucessfully Logged Out');
  }
  getDashboardData(){
    this.usersData = [];
    const path = 'api/user/getUser';
    let datas = {
      '_id':localStorage.getItem('_id')
    }
    this.homeService.postMethod(path, datas).pipe(take(1)).subscribe((res: any) => {
      this.check = false;
      this.usersData = res.data;
      this.formData.patchValue({name: res.data.name});
      this.imgFile = res.data.profileImage
    });
  }
  checkBalance(){
    this.usersData = [];
    const path = 'api/user/getUser';
    let datas = {
      '_id':localStorage.getItem('_id')
    }
    this.homeService.postMethod(path, datas).pipe(take(1)).subscribe((res: any) => {
      this.check = true;
      this.usersData = res.data;
    });
  }
}
