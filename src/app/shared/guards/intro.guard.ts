import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import { INTRO_KEY, StorageService } from 'src/app/welcome/services/storage.service';


@Injectable({
  providedIn: 'root'
})
export class IntroGuard implements CanLoad {

  constructor(
    private router: Router,
    private storage: StorageService) { }
  
  async canLoad(): Promise<boolean> {
    const hasSeenIntro = await this.storage.getStorage(INTRO_KEY);
    if(hasSeenIntro && hasSeenIntro.value == 'true') {
      return true;
    } else {
      this.router.navigateByUrl('/welcome', {replaceUrl: true});
      return true;
    }

  }
}
