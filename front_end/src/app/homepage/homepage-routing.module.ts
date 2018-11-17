import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EntranceComponent } from './entrance/entrance.component';

const routes: Routes = [
  {
    path: 'entrance',
    component: EntranceComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomepageRoutingModule { }
