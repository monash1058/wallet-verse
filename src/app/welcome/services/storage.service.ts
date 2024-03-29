import { Injectable } from '@angular/core';

import { Preferences  } from '@capacitor/preferences';

export const INTRO_KEY = 'intro-slides';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  setStorage(key, value) {
    return Preferences.set({
      key,
      value
    });
  }

  getStorage(key) {
    return Preferences.get({key});
  }
  
}
