import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HomepageService } from '../homepage.service';
import { MapViewComponent } from 'src/app/map/map-view/map-view.component';

@Component({
  selector: 'app-group-view',
  templateUrl: './group-view.component.html',
  styleUrls: ['./group-view.component.css']
})
export class GroupViewComponent implements OnInit {

  groupKey: string;

  @ViewChild('mapView') mapView: MapViewComponent;

  constructor(private route: ActivatedRoute, private hostService: HomepageService, private router: Router) {
    this.groupKey = this.route.snapshot.paramMap.get('name');
  }

  userName = '';
  userType: 'normal' | 'guide' = 'normal';

  userInserted = false;

  ngOnInit() {
  }

  createUser() {
    this.hostService.joinToGroup({ name: this.userName, type: this.userType }, this.groupKey).subscribe(res => {
      this.userInserted = true;
    }, error => alert(error.message || error));
  }

  setType(type: 'normal' | 'guide') {
    this.userType = type;
  }

  onUnsub() {
    this.mapView.unsubscribeUser(this.groupKey, this.userName).subscribe(_ => {
      this.router.navigate(['/']);
    });
  }
}
