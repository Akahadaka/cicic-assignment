import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { tap } from 'rxjs/operators'

import { Institution } from './data.model'

const ENV_URL = 'api/';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  getInstitutions$() {
    return this.http
      .get<Institution[]>(ENV_URL + 'institutions', { responseType: 'json' })
      .pipe(tap(console.log))
  }
}
