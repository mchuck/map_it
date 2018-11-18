import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { MapService } from '../map.service';

import { map, Map, tileLayer } from 'leaflet';
import { MapCredentials } from '../models';
import { LocalizationService } from 'src/app/localization.service';
import { Coord } from '../models/coords';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.css']
})
export class MapViewComponent implements OnInit {

  @ViewChild('mapContainer') mapContainer: ElementRef;

  public map = undefined;

  mapL: Map = undefined;

  constructor(private mapService: MapService, private cred: MapCredentials, private locService: LocalizationService) { }

  ngOnInit() {
    this.locService.getLocalization((p) => this.onGetLocalizationSuccess(p), error => console.log(error));
  }

  fetchMap(startingCoord: Coord) {

    this.mapL = map(this.mapContainer.nativeElement).setView([startingCoord.latitude, startingCoord.longitude], 15);

    tileLayer(`https://1.base.maps.api.here.com/maptile/2.1/maptile/newest/` +
      `reduced.day/{z}/{x}/{y}/256/png8?app_id=pYcVUdzXaKUNelaYX98n&app_code=e4Nq7y32dS96gUbBFbNllg`)
      .addTo(this.mapL);

  }

  onGetLocalizationSuccess(position: Position) {
    this.fetchMap(position.coords as Coord);
  }
}
