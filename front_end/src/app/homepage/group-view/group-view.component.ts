import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HomepageService } from '../homepage.service';

@Component({
  selector: 'app-group-view',
  templateUrl: './group-view.component.html',
  styleUrls: ['./group-view.component.css']
})
export class GroupViewComponent implements OnInit {

  groupKey: string;

  constructor(private route: ActivatedRoute, private hostService: HomepageService) {
    this.groupKey = this.route.snapshot.paramMap.get('name');
  }

  userName = '';
  userType: 'normal' | 'guide' = 'normal';

  userInserted = false;

  ngOnInit() {
  }

  createUser(name: string) {
    this.userName = name;
    this.hostService.joinToGroup({ name: name, type: this.userType }, this.groupKey).subscribe(res => {
      this.userInserted = true;
    }, error => alert(error.message || error));
  }

  setType(type: 'normal' | 'guide') {
    this.userName = type;
  }
}
