import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalizationService {

  constructor() { }

  getLocalization(fn: PositionCallback, error: PositionErrorCallback) {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(fn, error);
    } else {
      console.log('nie ma lokazliacji');
    }
  }
}
