import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as operators from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  resumeInMD: string = '';

  constructor(
    private httpClient: HttpClient,
    private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe((params) => {
      
      console.debug('params:', params);

      const target = params?.target || 'assets/documents/resumee.md'

      this.getResumeInMD(target).subscribe((resumeInMD) => {
        console.debug('target:', target);
        console.debug('resumeInMD:', resumeInMD);
        this.resumeInMD = resumeInMD;
      });

    })
  }

  getResumeInMD(url: string = 'assets/documents/resumee.md') {
    return this.httpClient.get(url, {responseType: 'text'})
  }
}
