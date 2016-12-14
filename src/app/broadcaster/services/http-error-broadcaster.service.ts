import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Broadcaster } from './broadcaster.service';

@Injectable()
export class HttpErrorBroadcaster {

    constructor(
        private broadcaster: Broadcaster
    ) { }

    public fire(status: number) {
        let detail: string = '';
        if (status === 0 || status >= 500 && status < 600) {
            detail = 'Произошла ошибка на сервере. Повторите действие позже.';
        }
        this.broadcaster.broadcast(HttpErrorBroadcaster, {status, detail});
    }

    public on(): Observable<string> {
        return this.broadcaster.on<string>(HttpErrorBroadcaster);
    }
}
