import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapCredentials } from './models';
import { MapViewComponent } from './map-view/map-view.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [MapViewComponent],
  exports: [MapViewComponent]
})
export class MapModule {
  public static forRoot(options: MapCredentials): ModuleWithProviders {
    return {
      ngModule: MapModule,
      providers: [
        {
          provide: MapCredentials,
          useValue: options
        }
      ]
    };
  }
}
