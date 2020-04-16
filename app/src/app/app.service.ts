import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import * as operators from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Meta } from '@angular/platform-browser';
import { environment } from '../environments/environment';

const BASE_URL = environment.production ? 
	'https://resumee.work' :
	'http://localhost:4200';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  resumeInMD: string = '';
	target: string = this.getUrl('/resumes/resumee.md');
	target$: Subject<string> = new Subject<string>();

	get targetBasename(): string {
		return basename(this.target);
	}

  constructor(
		@Inject(PLATFORM_ID) private platformId,

    private httpClient: HttpClient,
    private route: ActivatedRoute,
    private metaService: Meta
  ) {

		this.target$.pipe(
			operators.switchMap((target) => {
				this.target = target;
				return this.getResumeInMD(this.target);		
			}),
		).subscribe((resumeInMD: string) => {
			console.debug('resumeInMD:', resumeInMD);
			this.resumeInMD = resumeInMD;
			this.setMetaTag(resumeInMD);
		});

  }

	getUrl(path: string): string {
		return BASE_URL + path
	}

  getResumeInMD(url: string = BASE_URL + '/resumes/resumee.md') {
    return this.httpClient.get(url, {responseType: 'text'})
  }

  setMetaTag(resumeInMD: string) {
    this.metaService.addTag({name: 'description', content: resumeInMD});
    this.metaService.addTag({property: 'og:title', content: 'RESUMEE WORK'});
    this.metaService.addTag({property: 'og:description', content: resumeInMD});
    this.metaService.addTag({property: 'og:type', content: 'article'});
    this.metaService.addTag({property: 'og:url', content: 'https://resumee.work'});
    this.metaService.addTag({property: 'og:image', content: 'https://resumee.work/assets/img/ogp.png'});
    this.metaService.addTag({property: 'fb:app_id', content: 'this.fbAppId'});
    this.metaService.addTag({property: 'twitter:card', content: 'summary_large_image'});
    this.metaService.addTag({property: 'twitter:site', content: '@nontan_univ'});
    this.metaService.addTag({property: 'twitter:creator', content: '@nontan_univ'});
  }

  uploadMarkdown(file: File) {
    let data = new FormData();
    data.append('file', file, file.name);
    return this.httpClient.post('upload', data)
  }

	getCurrentURL(): string {
		if (isPlatformBrowser(this.platformId)){
			return window.location.href;
		}
		return '';
	}
}

function basename(path) {
   return path.split('/').reverse()[0];
}
