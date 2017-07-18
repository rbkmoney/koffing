import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Broadcaster } from './broadcaster.service';

@Injectable()
export class SearchInvoiceTemplatesBroadcaster {

    constructor(private broadcaster: Broadcaster) {}

    public fire() {
        this.broadcaster.broadcast(SearchInvoiceTemplatesBroadcaster);
    }

    public on(): Observable<string> {
        return this.broadcaster.on<string>(SearchInvoiceTemplatesBroadcaster);
    }
}
