import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalizationService } from './localization.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'haker';
  ngOnInit(): void {
    this.locService.getLocalization(_ => {}, this.onError);
  }

  private onError(error) {
    console.error(error);
  }

  constructor(private router: Router, private locService: LocalizationService) { }



  goToMainView() {
    this.router.navigate(['/']);
  }
}
