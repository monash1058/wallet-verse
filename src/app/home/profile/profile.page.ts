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
  imageUrl: any = '../../../assets/images/man.png';
  imgFile:any;
  usersData: any;
  check = false;
  constructor(private homeService: HomeService,private cd: ChangeDetectorRef, private toastr: ToastrCustomService, private router : Router,private fb: FormBuilder) { }

  ngOnInit() {
    this.formData = this.fb.group({
      name: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.pattern("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$#!_%*?&])[A-Za-z\d$@$!%*?&].{7,30}")]],
      file: [null],
   });
  }
  ionViewWillEnter() {
    this.getDashboardData();
  }

  uploadFile(event) {
    let reader = new FileReader(); // HTML5 FileReader API
    let file = event.target.files[0];
    this.imgFile = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(file);

      // When file uploads set it to file formcontrol
      reader.onload = () => {
        this.imageUrl = reader.result;
        console.log(this.imageUrl)
        this.formData.patchValue({
          file: reader.result
        });
      }
      // ChangeDetectorRef since file is loading outside the zone
      this.cd.markForCheck();        
    }
  }

  onClickSubmit() {
    var formData: any = new FormData();
    formData.append('_id', localStorage.getItem('_id'));
    formData.append('name', this.formData.get('name').value);
    formData.append('password', this.formData.get('password').value);
    formData.append('profileImage', this.imgFile);
    if(!this.formData.valid) {
      this.formData.markAllAsTouched();
      return;
    }
    const path = "api/user/editProfile";
    this.homeService.postMethod(path, formData).pipe(take(1)).subscribe((res: any) => {
      this.toastr.success(res.message);
      setTimeout(function(){
        this.router.navigate(['../auth/login']);
        localStorage.clear();
      },5000);
    });
  }
  logout() {
    localStorage.clear();
    this.router.navigate(['/']);
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
      this.imageUrl = res.data.profileImage
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
