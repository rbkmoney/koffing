import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { clone, forEach } from 'lodash';

import { Event } from 'koffing/backend/model/event/event';
import { InvoiceChange } from 'koffing/backend/model/event/invoice-change';
import { InvoiceStatusChanged } from 'koffing/backend/model/event/invoice-status-changed';
import { PaymentStatusChanged } from 'koffing/backend/model/event/payment-status-changed';
import { EventService } from 'koffing/backend/event.service';

@Injectable()
export class EventPollerService {

    private interval: number = 300;
    private retries: number = 5;
    private limitStartEvents: number = 10;
    private lastEvent: Event = new Event();

    constructor(
        private eventService: EventService,
    ) { }

    public startPolling(invoiceID: string, pollingChange: InvoiceChange): Observable<boolean> {
        return Observable.create((observer: Observer<boolean>) => {
            let i = 0;
            const interval = setInterval(() => {
                this.getNextLastEvent(invoiceID, this.lastEvent.id).subscribe((event) => {
                    if (event) {
                        this.lastEvent = clone(event);
                    }

                    if (this.checkEvent(this.lastEvent, pollingChange)) {
                        clearInterval(interval);
                        observer.next(true);
                        observer.complete();
                    }

                    if (++i >= this.retries) {
                        clearInterval(interval);
                        observer.next(false);
                        observer.complete();
                    }
                });
            }, this.interval);
        });
    }

    private checkEvent(event: Event, pollingChange: InvoiceChange): boolean {
        let result = false;
        forEach(event.changes, (eventChange) => {
            if (pollingChange instanceof InvoiceStatusChanged && pollingChange.changeType === eventChange.changeType) {
                const change = eventChange as InvoiceStatusChanged;
                if (pollingChange.status === change.status) {
                    result = true;
                }
            } else
            if (pollingChange instanceof PaymentStatusChanged && pollingChange.changeType === eventChange.changeType) {
                const change = eventChange as PaymentStatusChanged;
                if (pollingChange.status === change.status) {
                    result = true;
                }
            }
        });
        return result;
    }

    private getNextLastEvent(invoiceID: string, currentLastEventID?: number): Observable<Event> {
        if (currentLastEventID || currentLastEventID === 0) {
            return this.eventService.getInvoiceEvents(invoiceID, 1, currentLastEventID).map((events) => events[0]);
        } else {
            return this.eventService.getInvoiceEvents(invoiceID, this.limitStartEvents).map((events) => this.filterLastEvent(events));
        }
    }

    private filterLastEvent(events: Event[]) {
        return events && events.length > 0 ? events[events.length - 1] : null;
    }
}
