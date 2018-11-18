import { Component, OnInit } from '@angular/core';
import { HomepageService } from '../homepage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-entrance',
  templateUrl: './entrance.component.html',
  styleUrls: ['./entrance.component.css']
})
export class EntranceComponent implements OnInit {

  constructor(private homeService: HomepageService, private router: Router) { }

  ngOnInit() {
  }

  onJoinGroup(value: string) {
    this.router.navigate(['/groupview', value]);
  }
}
