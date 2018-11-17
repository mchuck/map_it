import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HomepageService } from '../homepage.service';

@Component({
  selector: 'app-group-view',
  templateUrl: './group-view.component.html',
  styleUrls: ['./group-view.component.css']
})
export class GroupViewComponent implements OnInit {

  groupName: string;

  constructor(private route: ActivatedRoute, private hostService: HomepageService) {
    this.groupName = this.route.snapshot.paramMap.get('name');
  }

  userName = '';
  userType: 'normal' | 'guide';

  userInserted = false;

  ngOnInit() {
  }

  createUser(name: string, type: string ) {
    this.hostService.joinToGroup({name: name, type: type}, this.groupName).subscribe(res => {
      this.userInserted = true;
    }, error => alert(error.message || error ));
  }

}
