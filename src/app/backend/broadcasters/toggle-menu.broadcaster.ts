import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Broadcaster } from './broadcaster';

@Injectable()
export class ToggleMenuEvent {
    constructor(private broadcaster: Broadcaster) {}

    public fire() {
        this.broadcaster.broadcast(ToggleMenuEvent);
    }

    public on(): Observable<string> {
        return this.broadcaster.on<string>(ToggleMenuEvent);
    }
}
