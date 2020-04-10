import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import * as operators from 'rxjs/operators';
import { EnvironmentService } from '../environment/environment.service';

declare let gtag: Function;

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

  constructor(
    private router: Router,
    private environmentService: EnvironmentService
  ) {
    this.router.events.pipe(
      operators.filter(event => event instanceof NavigationEnd)
    ).subscribe((params: any) => {
      this.sendPageView(params.url);
    });
  }

  private useGA(): boolean {
    return typeof gtag !== undefined;
  }

  sendPageView(url: string): void {
    if (!this.useGA()) {
      return;
    }
    if (!url.startsWith('/')) {
      url = `/${url}`;
    }
    if (this.environmentService.environment.production) {
      // @ts-ignore
      gtag('config', this.environmentService.environment.analytics.id, {
        page_path: url
      });
    }
  }

  sendEvent(
    eventName: string,
    eventCategory: string,
    eventAction: string,
    eventLabel: any
  ): void {

    if (!this.useGA()) {
      return;
    }
    if (this.environmentService.environment.production) {
      // @ts-ignore
      gtag('event', eventName, {
        event_category: eventCategory,
        event_action: eventAction,
        event_label: eventLabel
      });
    }

  }

}
