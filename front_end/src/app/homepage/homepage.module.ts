import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomepageRoutingModule } from './homepage-routing.module';
import { EntranceComponent } from './entrance/entrance.component';
import { AddGroupComponent } from './add-group/add-group.component';

@NgModule({
  declarations: [EntranceComponent, AddGroupComponent],
  imports: [
    CommonModule,
    HomepageRoutingModule
  ]
})
export class HomepageModule { }
