import { Component, OnInit, ElementRef, ViewChild, OnDestroy, Input } from '@angular/core';
import { MapService } from '../map.service';

import { map, Map, tileLayer, marker, divIcon } from 'leaflet';
import { MapCredentials } from '../models';
import { LocalizationService } from 'src/app/localization.service';
import { Coord } from '../models/coords';

const icon = divIcon({ className: 'div-icon' });

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

  marker: any = undefined;

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

    this.marker = marker([startingCoord.latitude, startingCoord.longitude], { icon: icon })
      .addTo(this.mapL);
  }

  onGetLocalizationSuccess(position: Position) {

    this.mapService.updateLocalization(this.groupName, this.userName, position.coords as Coord)
      .subscribe(res => {
        console.log(res);
          this.marker.remove();
          this.marker = marker([position.coords.latitude, position.coords.longitude], {icon: icon}).addTo(this.mapL);
          this.mapL.setView([position.coords.latitude, position.coords.longitude], this.mapL.getZoom());
      });
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
