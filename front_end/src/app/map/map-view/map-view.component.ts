import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { MapService } from '../map.service';

import { map, Map, tileLayer } from 'leaflet';
import { MapCredentials } from '../models';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.css']
})
export class MapViewComponent implements OnInit {

  @ViewChild('mapContainer') mapContainer: ElementRef;

  public map = undefined;

  mapL: Map = undefined;

  constructor(private mapService: MapService, private cred: MapCredentials) { }

  ngOnInit() {
    this.fetchMap('');
  }

  fetchMap(action: string) {

  //this.mapL = map(this.mapContainer.nativeElement).setView([51.505, -0.09], 13);

   // tileLayer(`https://1.base.maps.api.here.com/maptile/2.1/maptile/newest/normal.day/{z}/{x}/{y}/256/png8?app_id=pYcVUdzXaKUNelaYX98n&app_code=e4Nq7y32dS96gUbBFbNllg`).addTo(this.mapL);

  }
}
