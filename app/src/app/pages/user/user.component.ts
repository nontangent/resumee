import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import * as operators from 'rxjs/operators';
import { AppService } from "../../app.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

	user: string = '';
	user$: Observable<string> = this.route.paramMap.pipe(
		operators.map((params: ParamMap) => {
			const user = params.get('user');
			return user;
		})
	);

	constructor(
		private route: ActivatedRoute,
		private appService: AppService,
	) { }

  ngOnInit(): void {
		this.user$.subscribe((user: string) => {
			this.user = user;
			console.debug('this.user:', this.user);
			const target = this.getTargetByUser(this.user);
			this.appService.target$.next(target);
		});
  }

	getTargetByUser(user: string): string {
		return `https://raw.githubusercontent.com/${user}/resume/master/README.md`
	}

}
