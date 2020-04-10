import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as operators from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Meta } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  resumeInMD: string = '';

  constructor(
    private httpClient: HttpClient,
    private route: ActivatedRoute,
    private metaService: Meta
  ) {
    this.route.queryParams.subscribe((params) => {
      
      console.debug('params:', params);

      const target = params?.target || 'https://raw.githubusercontent.com/nontan18/resumee/master/app/src/assets/documents/resumee.md'
      console.log('target:', target);

      this.getResumeInMD(target).pipe(
        operators.take(1)
      ).subscribe((resumeInMD) => {
        console.log('resumeInMD:', resumeInMD);
        this.resumeInMD = resumeInMD;
        this.setMetaTag(resumeInMD);
      });

    })
  }

  getResumeInMD(url: string = 'assets/documents/resumee.md') {
    return this.httpClient.get(url, {responseType: 'text'})
  }

  setMetaTag(resumeInMD: string) {
    this.metaService.addTag({name: 'description', content: resumeInMD});
    this.metaService.addTag({property: 'og:title', content: 'RESUMEE WORK'});
    this.metaService.addTag({property: 'og:description', content: resumeInMD});
    this.metaService.addTag({property: 'og:type', content: 'article'});
    this.metaService.addTag({property: 'og:url', content: 'https://resumee.work'});
    this.metaService.addTag({property: 'og:image', content: ''});
    this.metaService.addTag({property: 'fb:app_id', content: 'this.fbAppId'});
    this.metaService.addTag({property: 'twitter:card', content: 'summary'});
    this.metaService.addTag({property: 'twitter:site', content: '@resumee'});
    this.metaService.addTag({property: 'twitter:creator', content: '@resumee'});
  }

  uploadMarkdown(file: File) {
    let data = new FormData();
    data.append('file', file, file.name);
    return this.httpClient.post('upload', data)
  }
}
