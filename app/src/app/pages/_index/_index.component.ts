import { Component, OnInit } from '@angular/core';
import { Routes, ActivatedRoute } from '@angular/router';
import { AppService } from '../../app.service';
import { Observable } from 'rxjs';
import * as operators from 'rxjs/operators';

@Component({
  selector: 'app-index',
  templateUrl: './_index.component.html',
  styleUrls: ['./_index.component.scss']
})
export class IndexComponent implements OnInit {

	target$: Observable<string> = this.route.queryParamMap.pipe(
		operators.map((paramMap) => {
			console.debug('paramMap:', paramMap);
			const target = paramMap.get('target') 
				|| this.appService.getUrl('/resumes/resumee.md');
			return target;
		}),
	);


	constructor(
		public route: ActivatedRoute,
		public appService: AppService
	) { }

  ngOnInit(): void {
		this.target$.subscribe((target) => {
			this.appService.target$.next(target);
		});
  }

}
