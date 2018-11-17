import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class HomepageService {

  constructor(private http: HttpClient) { }

  createGroup(nameGroup: string): Observable<string> {
    return this.http.post<string>(environment.API + '/group', { name: nameGroup });
  }
}
