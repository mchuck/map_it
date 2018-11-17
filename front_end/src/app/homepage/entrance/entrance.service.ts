import { Injectable } from '@angular/core';
import { createRootComponent } from '@angular/core/src/render3/component';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs';
import { HttpClient } from 'selenium-webdriver/http';

@Injectable({
  providedIn: 'root'
})
export class EntranceService {

  constructor(private http: HttpClient) { }

  createGroup(): Observable<any> {
    return of('new group');
  }

}
