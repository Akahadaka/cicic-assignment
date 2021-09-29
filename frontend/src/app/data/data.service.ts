import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable, throwError } from 'rxjs'
import { catchError, take, tap } from 'rxjs/operators'

import { Institution } from './data.model'

const ENV_URL = 'api/';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  institutions$: BehaviorSubject<Institution[]> = new BehaviorSubject([] as Institution[])

  getInstitutions() {
    return this.http
      .get<Institution[]>(ENV_URL + 'institutions', { responseType: 'json' })
      .pipe(
        take(1),
        catchError(_ => this.handleError('get institutions'))
      ).subscribe((data: Institution[]) => {
        this.institutions$.next(data)
      })
  }

  updateInstitute(data: Institution) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    })
    this.http
      .put<Institution>(ENV_URL + 'institution/' + data.id, JSON.stringify(data), { headers })
    .pipe(
      tap(console.log),
      catchError(_ => this.handleError('update institution', data))
    ).subscribe((response: Institution) => {
      // TODO Handle updating without additional request
      this.getInstitutions()
    })
  }

  createInstitute(data: Institution) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    })
    this.http
      .post<Institution>(ENV_URL + 'institution/', JSON.stringify(data), { headers })
    .pipe(
      tap(console.log),
      catchError(_ => this.handleError('create institution', data))
    ).subscribe((response: Institution) => {
      // TODO Handle updating without additional request
      this.getInstitutions()
    })
  }

  deleteInstitute(id: number) {
    this.http.delete(ENV_URL + 'institution/' + id)
    .pipe(
      tap(console.log),
      catchError(_ => this.handleError('delete institution'))
    ).subscribe((response: number) => {
      // TODO Handle updating without additional request
      this.getInstitutions()
    })
  }

  // this.handleError('update', data)
  handleError(action: string, data?: Institution): Observable<any> {
    return throwError('Could not ' + action + ': ' + data?.name)
  }
}
