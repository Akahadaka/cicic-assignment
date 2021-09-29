import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { MatSnackBar } from '@angular/material/snack-bar'
import { BehaviorSubject, Observable, ReplaySubject, throwError } from 'rxjs'
import { catchError, take } from 'rxjs/operators'

import { Institution } from './data.model'

const ENV_URL = 'api/';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient, private snackbar: MatSnackBar) {}

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

  updateInstitute(data: Institution): Observable<Institution> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    })
    const result$: ReplaySubject<Institution> = new ReplaySubject()
    
    this.http
      .put<Institution>(ENV_URL + 'institution/' + data.id, JSON.stringify(data), { headers })
      .pipe(
        take(1),
        catchError(_ => this.handleError('update institution', data))
      ).subscribe((response: Institution) => {
        result$.next(response)
        // TODO Handle updating without additional request
        this.getInstitutions()
        this.snackbar.open('Institution '+ data.name +' updated successfully', 'OK', { duration: 5000 })
      })

    return result$
  }

  createInstitute(data: Institution): Observable<Institution> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    })
    const result$: ReplaySubject<Institution> = new ReplaySubject()
    
    this.http
      .post<Institution>(ENV_URL + 'institution/', JSON.stringify(data), { headers })
      .pipe(
        take(1),
        catchError(_ => this.handleError('create institution', data))
      ).subscribe((response: Institution) => {
        result$.next(response)
        // TODO Handle updating without additional request
        this.getInstitutions()
        this.snackbar.open('Institution '+ data.name +' created successfully', 'OK', { duration: 5000 })
      })

    return result$
  }

  deleteInstitute(id: number) {
    this.http.delete(ENV_URL + 'institution/' + id)
    .pipe(
      take(1),
      catchError(_ => this.handleError('delete institution'))
    ).subscribe((response: number) => {
      // TODO Handle updating without additional request
      this.getInstitutions()
      this.snackbar.open('Institution deleted successfully', 'OK', { duration: 5000 })
    })
  }

  // this.handleError('update', data)
  handleError(action: string, data?: Institution): Observable<any> {
    this.snackbar.open('⚠️ Could not ' + action + (data ? ': ' + data.name : ''), undefined, { duration: 8000 })
    return throwError('Could not ' + action + (data ? ': ' + data.name : ''))
  }
}
