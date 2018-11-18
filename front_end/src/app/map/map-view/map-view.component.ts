import { Component, OnInit, ElementRef, ViewChild, OnDestroy, Input } from '@angular/core';
import { MapService } from '../map.service';

import { map, Map, tileLayer, marker, divIcon, Marker, icon, Layer, layerGroup, LayerGroup, featureGroup, polyline } from 'leaflet';
import { MapCredentials } from '../models';
import { LocalizationService } from 'src/app/localization.service';
import { Coord } from '../models/coords';

import { forkJoin } from 'rxjs';
import { resource } from 'selenium-webdriver/http';

const iconNormal = divIcon({ className: 'div-icon normal' });

const iconGuide = divIcon({ className: 'div-icon guide' });

const iconSVGMe = icon({
    iconUrl: 'assets/images/marker-me.svg',
    iconSize: [25, 25]
});

const iconSVGGuide = icon({
    iconUrl: 'assets/images/marker-guide.svg',
    iconSize: [25, 25]
});

const iconSVGOther = icon({
    iconUrl: 'assets/images/marker-other.svg',
    iconSize: [25, 25]
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
    paths: any[] = [];

    markersLayer: LayerGroup<any>;
    pathsLayer: LayerGroup<any>;

    leyer: any;

    private currentPosition: any;
    private localizationHandler: any;
    private isLoading = false;
    private timer: any;
    public locationPending = true;
    private noBounding = false;

    constructor(private mapService: MapService, private cred: MapCredentials, private locService: LocalizationService) { }

    ngOnInit() {
        this.initMap();

    }

    initMap() {
        this.mapL = map(this.mapContainer.nativeElement)
        this.mapService.getTileLayer().addTo(this.mapL);

        this.locService.getLocalization((p) => {
            this.currentPosition = p;
            this.locationPending = false;
        },
            error => console.log(error));

        this.localizationHandler = this.locService.watchPosition(
            (p) => { this.currentPosition = p; },
            error => console.log(error));

        this.timer = setInterval(() => this.onGetLocalizationSuccess(this.currentPosition), 1000);
    }

    getIconSVG(type: 'guide' | 'normal') {
        return type === 'guide' ? iconSVGGuide : iconSVGOther;
    }

    onGetLocalizationSuccess(position: Position) {
        if (this.isLoading || !position) {
            return;
        }

        this.isLoading = true;

        this.mapService.updateLocalization(this.groupName, this.userName, position.coords as Coord)
            .subscribe(res => {

                const guidePosition = this.getGuidePosition(res.participants);
                const otherPositions = res.participants.filter(u => u.type !== 'guide').map(u => this.getPositionAndNameFrommUser(u));

                if (guidePosition) {
                    const observablesArr = [];
                    for (const pos of otherPositions) {

                        // tslint:disable-next-line:curly
                        if (!pos) continue;

                        observablesArr.push(this.mapService.getRoute(
                            {
                                latitude: guidePosition.lat,
                                longitude: guidePosition.lon
                            },
                            {
                                latitude: pos.lat,
                                longitude: pos.lon
                            },
                            `${guidePosition.name},${pos.name}`
                        ));
                    }

                    forkJoin(observablesArr)
                        .subscribe(response => this.drawPath(response));
                }

                this.updateMarkers(res.participants);
                if (this.markersLayer) {
                    this.mapL.removeLayer(this.markersLayer);
                }

                if (this.markers) {
                    this.markersLayer = layerGroup(this.markers).addTo(this.mapL);
                    if (!this.noBounding) {
                        this.suitMapToMarkers();
                        this.noBounding = true;
                    }

                }
                this.isLoading = false;
            }, _ => this.isLoading = false);
    }

    getGuidePosition(participants: any[]) {
        const user = participants.find(u => u.type === 'guide') || null;

        return this.getPositionAndNameFrommUser(user);
    }

    getPositionAndNameFrommUser(user) {
        if (user && user.positions.length > 0) {
            return { ...user.positions.slice(-1)[0], name: user.name };
        }

        return null;
    }

    drawPath(response: any[]) {

        this.paths = [];

        const mineOptions = {
            color: '#FF7100',
            weight: 3
        };

        const otherOptions = {
            color: '#909090',
            weight: 2
        };

        const getOptions = (requestId: string) => {
            return requestId.indexOf(this.userName) > -1 ? mineOptions : otherOptions;
        };

        if (this.pathsLayer) {
            this.mapL.removeLayer(this.pathsLayer);
        }


        for (const res of response) {
            const arr = res.response.route[0].shape.map(x => x.split(','));
            this.paths.push(polyline(arr, getOptions(res.response.requestId)));
        }

        this.pathsLayer = layerGroup(this.paths).addTo(this.mapL);
    }
    updateMarkers(participants: any) {
        this.markers = [];
        for (const user of participants) {
            const userPosition = user.positions.slice(-1)[0];
            if (!userPosition) {
                continue;
            }
            let iconTemplate = this.getIconSVG(user.type);

            if (user.name === this.userName) {
                iconTemplate = iconSVGMe;
            }
            this.markers.push(marker([userPosition.lat, userPosition.lon],
                { icon: iconTemplate })
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
        if (user.phone) { return `&#128100 <b>${user.name}</b> </br>&#9742 ${user.phone}`; }

        return `&#128100 <b>${user.name}</b>`;

    }



    ngOnDestroy(): void {
        clearInterval(this.timer);
        this.unsubscribeUser(this.groupName, this.userName);
        this.locService.stopLocaliztion(this.localizationHandler);
    }
}
