import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { HomepageRoutingModule } from './homepage-routing.module';
import { EntranceComponent } from './entrance/entrance.component';
import { AddGroupComponent } from './add-group/add-group.component';
import { MapModule } from '../map/map.module';

@NgModule({
  declarations: [EntranceComponent, AddGroupComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MapModule,
    HomepageRoutingModule
  ]
})
export class HomepageModule { }
