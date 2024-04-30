import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  loading: WritableSignal<boolean> = signal(false);

  addLoading() {
    this.loading.set(true);
  }

  removeLoading() {
    this.loading.set(false);
  }
}
