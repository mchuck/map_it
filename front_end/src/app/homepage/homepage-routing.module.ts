import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EntranceComponent } from './entrance/entrance.component';
import { AddGroupComponent } from './add-group/add-group.component';
import { GroupViewComponent } from './group-view/group-view.component';

const routes: Routes = [
  {
    path: '',
    component: EntranceComponent
  },
  {
    path: 'add',
    component: AddGroupComponent
  },
  {
    path: 'groupview/:name',
    component: GroupViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomepageRoutingModule { }
