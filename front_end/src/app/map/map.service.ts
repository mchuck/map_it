import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MapCredentials } from './models';
import { environment } from 'src/environments/environment';
import { Coord } from './models/coords';
import { tileLayer, TileLayer } from 'leaflet';


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

  unsubscribeFromGroup(groupKey: string, userName: string) {
    return this.http.delete<any>(environment.API + '/group/' + groupKey + '/participant/' + userName);
  }

  getTileLayer(): TileLayer {
    // tslint:disable-next-line:max-line-length
    return tileLayer(`https://1.base.maps.api.here.com/maptile/2.1/maptile/newest/reduced.day/{z}/{x}/{y}/256/png8?` + this.cred.CobmineCredentialParams());
  }

  getRoute(start: Coord, end: Coord, requestTag: string = ''): Observable<any> {
    return this.http.get<any>(
      `https://route.api.here.com/routing/7.2/calculateroute.json` +
      `?app_id=X9q6IgOWg1KqUZlBV7Us` +
      `&app_code=HFeE36t-oaTU8YOwV2AEmQ` +
      `&waypoint0=geo!${start.latitude},${start.longitude}` +
      `&waypoint1=geo!${end.latitude},${end.longitude}` +
      `&mode=fastest;car;traffic:disabled&routeattributes=shape&requestId=${requestTag}`);
  }


}
