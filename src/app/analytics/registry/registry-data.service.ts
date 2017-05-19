import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { Observable, Observer } from 'rxjs';
import 'rxjs/add/observable/forkJoin';

import { Invoice } from 'koffing/backend/model/invoice';
import { Payment } from 'koffing/backend/model/payment';
import { SearchPaymentsParams } from 'koffing/backend/requests/search-payments-request';
import { SearchService } from 'koffing/backend/search.service';
import { RegistryItem } from './registry-item.class';

@Injectable()
export class RegistryDataService {

    private limit: number = 15;

    constructor(
        private searchService: SearchService
    ) { }

    public getRegistry(shopID: string, fromTime: Date, toTime: Date): Observable<RegistryItem[]> {
        return Observable.create((observer: Observer<RegistryItem[]>) => {
            const registry: RegistryItem[] = [];

            const searchPaymentsParams = new SearchPaymentsParams();
            searchPaymentsParams.fromTime = fromTime;
            searchPaymentsParams.toTime = toTime;
            searchPaymentsParams.limit = this.limit;

            const paymentsRequest = this.searchService.searchPayments(shopID, searchPaymentsParams);
            const invoicesRequest = this.searchService.searchInvoices(shopID, searchPaymentsParams);

            Observable.forkJoin([paymentsRequest, invoicesRequest]).subscribe((response) => {
                const payments = response[0].result;
                const invoices = response[1].result;
                _.forEach(payments, (payment: Payment) => {
                    const foundInvoice = _.find(invoices, (invoice: Invoice) => invoice.id === payment.invoiceID);
                    const registryItem = new RegistryItem();
                    registryItem.invoiceID = payment.invoiceID;
                    registryItem.paymentDate = payment.createdAt;
                    registryItem.amount = payment.amount;
                    registryItem.someAmount = 0;
                    registryItem.product = foundInvoice.product;
                    registryItem.description = foundInvoice.description;
                    registry.push(registryItem);
                });
                observer.next(registry);
                observer.complete();
            });
        });

        // this.searchService.searchPayments(shopID, searchPaymentsParams).subscribe((response) => {
        //     let payments = response.result;
        //     const countAdditionalPaymentsRequests = _.ceil((response.totalCount - searchPaymentsParams.limit) / searchPaymentsParams.limit);
        //     if (countAdditionalPaymentsRequests > 0) {
        //         const additionalPaymentsRequests = [];
        //         for (let i = 1; i <= countAdditionalPaymentsRequests; i++) {
        //             searchPaymentsParams.offset = i * searchPaymentsParams.limit;
        //             additionalPaymentsRequests.push(this.searchService.searchPayments(shopID, searchPaymentsParams));
        //         }
        //         Observable.forkJoin(additionalPaymentsRequests).subscribe((response) => {
        //             _.forEach(response, (value) => payments = _.concat(payments, value.result));
        //             console.log(payments);
        //             return payments;
        //         });
        //     } else {
        //         console.log(payments);
        //         return payments;
        //     }
        // });

    }
}
