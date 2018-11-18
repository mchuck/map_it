import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpParams, HttpClient } from '@angular/common/http';
import { MapCredentials } from './models';
import { environment } from 'src/environments/environment.prod';
import { Coord } from './models/coords';


const MAP_API = 'https://image.maps.api.here.com/mia/1.6/mapview';
@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor(private http: HttpClient, private cred: MapCredentials) { }

  updateLocalization(groupKey: string, userName: string, userCoord: Coord): Observable<any> {
    return this.http.put<any>(environment.API + '/group/' + groupKey + '/participant/' + userName, {
      lat: userCoord.latitude,
      lon: userCoord.longitude
    });
  }

}
