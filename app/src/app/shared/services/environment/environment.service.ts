import { Injectable } from '@angular/core';

import { environment } from '../../../../environments';

@Injectable({
  providedIn: 'root'
})
export class EnvironmentService {

  environment = environment;

  constructor() {
    // environment.production = true;
  }
}
