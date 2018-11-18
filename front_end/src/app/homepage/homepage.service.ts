import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { GroupInformation } from './models/new-group';
import { User } from './models/user';

@Injectable({
  providedIn: 'root'
})
export class HomepageService {

  constructor(private http: HttpClient) { }

  createGroup(nameGroup: string): Observable<string> {
    return this.http.post<string>(environment.API + '/group', { name: nameGroup });
  }

  getGroup(key: string): Observable<GroupInformation> {
    return this.http.get<GroupInformation>(environment.API + '/group/' + key);
  }

  joinToGroup(userInfo: User, groupKey: string) {
    return this.http.post<string>(environment.API + '/group/' + groupKey + '/participant', userInfo);
  }
}
