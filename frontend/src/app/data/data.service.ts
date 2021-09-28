import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { tap } from 'rxjs/operators'

const ENV_URL = 'api/';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  getData() {
    this.http
      .get(ENV_URL + 'data', { responseType: 'json' })
      .pipe(tap(console.log))
      .subscribe();
  }
}
