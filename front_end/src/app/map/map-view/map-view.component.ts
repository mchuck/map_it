import { Component, OnInit, ElementRef, ViewChild, OnDestroy, Input } from '@angular/core';
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
export class MapViewComponent implements OnInit, OnDestroy {

  @Input() groupName: string;
  @Input() userName: string;

  @ViewChild('mapContainer') mapContainer: ElementRef;

  public map = undefined;

  mapL: Map = undefined;

  timer: any;

  constructor(private mapService: MapService, private cred: MapCredentials, private locService: LocalizationService) { }

  ngOnInit() {
    this.getLocalization((p) => this.initMap(p.coords as Coord));

    this.timer = setInterval(() => this.getLocalization((p) => this.onGetLocalizationSuccess(p)), 1000);
  }

  initMap(startingCoord: Coord) {

    this.mapL = map(this.mapContainer.nativeElement).setView([startingCoord.latitude, startingCoord.longitude], 15);
    tileLayer(`https://1.base.maps.api.here.com/maptile/2.1/maptile/newest/` +
      `reduced.day/{z}/{x}/{y}/256/png8?app_id=pYcVUdzXaKUNelaYX98n&app_code=e4Nq7y32dS96gUbBFbNllg`)
      .addTo(this.mapL);

  }

  onGetLocalizationSuccess(position: Position) {

    this.mapService.updateLocalization(this.groupName, this.userName, position.coords as Coord).subscribe(res => console.log(res));
    // this.fetchMap(position.coords as Coord);
  }

  getLocalization(fn: PositionCallback) {
    this.locService.getLocalization(fn, error => console.log(error));
  }

  unsubscribeUser(groupKey: string, userName: string) {
    return this.mapService.unsubscribeFromGroup(groupKey, userName);
  }

  ngOnDestroy(): void {
    clearInterval(this.timer);
    this.timer = undefined;
  }
}
