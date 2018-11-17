import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpParams, HttpClient } from '@angular/common/http';
import { MapCredentials } from './models';


const MAP_API = 'https://image.maps.api.here.com/mia/1.6/mapview';
@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor(private http: HttpClient, private cred: MapCredentials) { }


  getMap(options): Observable<Blob> {

    const params = { ...options, ...{ app_id: this.cred.AppID, app_code: this.cred.AppCode } };
    
    return this.http.get(MAP_API,
      {
        params: params,
        responseType: 'blob'
      }
    );
  }

}
