import { Component, OnInit } from '@angular/core';
import { HomepageService } from '../homepage.service';
import { Router } from '@angular/router';
import { GroupInformation } from '../models/new-group';

@Component({
  selector: 'app-entrance',
  templateUrl: './entrance.component.html',
  styleUrls: ['./entrance.component.css']
})
export class EntranceComponent implements OnInit {

  constructor(
    private homeService: HomepageService,
    private router: Router,
    private host: HomepageService) { }

  ngOnInit() {
  }

  onJoinGroup(value: string) {
    this.homeService.getGroup(value).subscribe((name: GroupInformation) => {
      this.router.navigate(['/groupview', value]);
    }, error => alert(error.message || error));
  }
}
