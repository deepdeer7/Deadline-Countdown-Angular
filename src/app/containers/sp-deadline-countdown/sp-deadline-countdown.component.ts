import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DeadlineCountdownService } from '../../services/deadline-countdown.service';
import { AsyncPipe } from '@angular/common';
import {
  catchError,
  map,
  switchMap,
  takeWhile,
  throwError,
  timer,
} from 'rxjs';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'sp-deadline-countdown',
  templateUrl: './sp-deadline-countdown.component.html',
  styleUrls: ['./sp-deadline-countdown.component.scss'],
  imports: [AsyncPipe],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpDeadlineCountdownComponent {
  isError = false;
  secondsLeft$ = this.deadlineCountdownService.getSecondsLeft().pipe(
    switchMap((left) => timer(0, 1000).pipe(map(() => left--))),
    takeWhile((left) => left >= 0),
    catchError((error) => {
      this.isError = true;

      return throwError(() => error);
    })
  );

  constructor(
    private readonly deadlineCountdownService: DeadlineCountdownService,
    public readonly loadingService: LoadingService
  ) {}
}
