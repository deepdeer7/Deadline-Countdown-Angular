import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, finalize, map, Observable, throwError } from 'rxjs';
import { API_DEADLINE } from '../constants/api.constants';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root',
})
export class DeadlineCountdownService {
  constructor(
    private readonly http: HttpClient,
    private readonly loadingService: LoadingService
  ) {}

  getSecondsLeft(): Observable<number> {
    this.loadingService.addLoading();

    return this.http.get<{ secondsLeft: number }>(API_DEADLINE).pipe(
      map(({ secondsLeft }) => secondsLeft),
      catchError((error) => {
        console.log('Error happened');

        return throwError(() => error);
      }),
      finalize(() => this.loadingService.removeLoading())
    );
  }
}
