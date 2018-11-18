import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { GroupInformation } from './models/new-group';
import { User } from './models/user';
import { of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomepageService {

  constructor(private http: HttpClient) { }

  createGroup(nameGroup: string): Observable<string> {
    return this.http.post<string>(environment.API + '/group', { name: nameGroup });
  }

  getGroup(key: string): Observable<GroupInformation> {
    if (!key || key.length === 0) {
      return throwError({ error: { message: 'Value cant be empty!' } });
    }
    return this.http.get<GroupInformation>(environment.API + '/group/' + key);
  }

  joinToGroup(userInfo: User, groupKey: string) {
    return this.http.post<string>(environment.API + '/group/' + groupKey + '/participant', userInfo);
  }
}
