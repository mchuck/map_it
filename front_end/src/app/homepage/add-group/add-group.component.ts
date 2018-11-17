import { Component, OnInit } from '@angular/core';
import { HomepageService } from '../homepage.service';

@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.css']
})
export class AddGroupComponent implements OnInit {

  groupId = undefined;
  link = location.host + '/groupView/';
  formSaved = false;

  constructor(private homeService: HomepageService) { }

  ngOnInit() {
  }

  onSave(groupName: string) {
    this.homeService.createGroup(groupName).subscribe((key: string) => {
      this.link += key;
      this.groupId = key;
      this.formSaved = true;
    }, error => alert(error.message || error));
  }

}
