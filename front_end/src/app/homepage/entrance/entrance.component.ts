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

    messageError: string;
    ngOnInit() {
    }

    onJoinGroup(value: string) {
        this.homeService.getGroup(value).subscribe((name: GroupInformation) => {
            this.router.navigate(['/groupview', value]);
        }, error => {
            console.log(error);
            this.messageError = error.error || 'Unknown error';
            setTimeout(() => this.messageError = null, 3000);
        });
    }
}
