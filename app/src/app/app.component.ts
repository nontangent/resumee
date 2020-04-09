import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'resumee';
  resumeInMD: string = '';
  resumeInMD$: Observable<string> = this.appService.getResumeInMD();


  constructor(public appService: AppService) { }

  ngOnInit() {}
}
