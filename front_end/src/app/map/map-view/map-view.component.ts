import { Component, OnInit, ElementRef, ViewChild, OnDestroy, Input } from '@angular/core';
import { MapService } from '../map.service';

import { map, Map, tileLayer, marker, divIcon, Marker, icon, Layer, layerGroup, LayerGroup, featureGroup } from 'leaflet';
import { MapCredentials } from '../models';
import { LocalizationService } from 'src/app/localization.service';
import { Coord } from '../models/coords';

import * as L from 'leaflet';

const iconNormal = divIcon({ className: 'div-icon normal' });

const iconGuide = divIcon({ className: 'div-icon guide' });

const iconSVG = icon({
    iconUrl: 'assets/images/marker.svg',
    iconSize: [50, 50]
});

const iconSVGGuide = icon({
    iconUrl: 'assets/images/marker-guide.svg',
    iconSize: [50, 50]
});

@Component({
    selector: 'app-map-view',
    templateUrl: './map-view.component.html',
    styleUrls: ['./map-view.component.css']
})
export class MapViewComponent implements OnInit, OnDestroy {

    @Input() groupName: string;
    @Input() userName: string;
    @Input() userType: 'guide' | 'normal';

    @ViewChild('mapContainer') mapContainer: ElementRef;

    mapL: Map = undefined;

    markers: Marker<any>[] = [];

    markersLayer: LayerGroup<any>;

    leyer: any;

    private currentPosition: any;
    private localizationHandler: any;
    private isLoading = false;
    private timer: any;

    constructor(private mapService: MapService, private cred: MapCredentials, private locService: LocalizationService) { }

    ngOnInit() {
        this.initMap();

    }

    initMap() {
        this.mapL = map(this.mapContainer.nativeElement)
        tileLayer(`https://1.base.maps.api.here.com/maptile/2.1/maptile/newest/` +
            `reduced.day/{z}/{x}/{y}/256/png8?app_id=pYcVUdzXaKUNelaYX98n&app_code=e4Nq7y32dS96gUbBFbNllg`)
            .addTo(this.mapL);

        this.locService.getLocalization((p) => { this.currentPosition = p },
            error => console.log(error));

        this.localizationHandler = this.locService.watchPosition(
            (p) => { this.currentPosition = p },
            error => console.log(error));

        this.timer = setInterval(() => this.onGetLocalizationSuccess(this.currentPosition), 1000);
    }

    getIcon(type: 'guide' | 'normal') {
        return type === 'guide' ? iconGuide : iconNormal;
    }

    getIconSVG(type: 'guide' | 'normal') {
        return type === 'guide' ? iconSVGGuide : iconSVG;
    }

    onGetLocalizationSuccess(position: Position) {
        console.log('inites')
        if (this.isLoading || !position) {
            return;
        }
        console.log('exited')
        this.isLoading = true;

        this.mapService.updateLocalization(this.groupName, this.userName, position.coords as Coord)
            .subscribe(res => {
                this.updateMarkers(res.participants);
                // this.getIcon(user.type)
                if (this.markersLayer) {
                    console.log('removed')
                    this.mapL.removeLayer(this.markersLayer);
                }

                if (this.markers) {
                    this.markersLayer = layerGroup(this.markers).addTo(this.mapL);
                    this.suitMapToMarkers();
                }
                this.isLoading = false;
            }, error => this.isLoading = false);
    }

    updateMarkers(participants: any) {
        this.markers = [];
        for (const user of participants) {
            const userPosition = user.positions.slice(-1)[0];
            if (!userPosition) {
                continue;
            }
            this.markers.push(marker([userPosition.lat, userPosition.lon],
                { icon: this.getIconSVG(user.type) })
                .bindPopup(this.createMarkerPopupContent(user)));
        }
    }

    unsubscribeUser(groupKey: string, userName: string) {
        return this.mapService.unsubscribeFromGroup(groupKey, userName);
    }

    suitMapToMarkers() {
        const group = featureGroup(this.markers);

        this.mapL.fitBounds(group.getBounds());
    }

    createMarkerPopupContent(user) {
        return `<b>${user.name}</b>`;
    }

    ngOnDestroy(): void {
        clearInterval(this.timer);
        this.unsubscribeUser(this.groupName, this.userName);
        this.locService.stopLocaliztion(this.localizationHandler);
    }
}
