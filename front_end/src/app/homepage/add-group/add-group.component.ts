import { Component, OnInit } from '@angular/core';
import { HomepageService } from '../homepage.service';

@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.css']
})
export class AddGroupComponent implements OnInit {

  get nameIsEmpty() {
    return !this.groupName || this.groupName.length === 0;
  }

  groupName = '';
  groupId = undefined;
  link = location.host + '/groupView/';
  formSaved = false;

  constructor(private homeService: HomepageService) { }

  ngOnInit() {
  }

  onSave() {
    this.homeService.createGroup(this.groupName).subscribe((key: string) => {
      this.link += key;
      this.groupId = key;
      this.formSaved = true;
    }, error => alert(error.message || error));
  }

}
