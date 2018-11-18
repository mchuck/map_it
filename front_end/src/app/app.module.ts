import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageModule } from './homepage/homepage.module';

import { MapCredentials } from './map/models';
import { MapModule } from './map/map.module';

export const HereMapCredetntials: MapCredentials = {
  ApiURL: 'https://image.maps.api.here.com/mia/1.6/mapview',
  AppID: 'pYcVUdzXaKUNelaYX98n',
  AppCode: 'e4Nq7y32dS96gUbBFbNllg'
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HomepageModule,
    MapModule.forRoot(HereMapCredetntials),
    AppRoutingModule
  ],
  providers: [ ],
  bootstrap: [AppComponent]
})
export class AppModule { }
