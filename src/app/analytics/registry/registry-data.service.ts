import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { Observable, Observer } from 'rxjs';
import 'rxjs/add/observable/forkJoin';

import { Invoice } from 'koffing/backend/model/invoice';
import { Payment } from 'koffing/backend/model/payment';
import { ContractService } from 'koffing/backend/services/contract.service';
import { SearchPaymentsParams } from 'koffing/backend/requests/search-payments-request';
import { SearchService } from 'koffing/backend/search.service';
import { Registry } from './registry.class';
import { RegistryItem } from './registry-item.class';

@Injectable()
export class RegistryDataService {

    private limit: number = 1000;

    constructor(
        private searchService: SearchService,
        private contractService: ContractService
    ) { }

    public getRegistry(shopID: string, fromTime: Date, toTime: Date): Observable<Registry> {
        return Observable.create((observer: Observer<Registry>) => {
            const searchPaymentsParams = this.newSearchPaymentsParams(fromTime, toTime);
            const observablePayments = this.searchService.searchPayments(shopID, searchPaymentsParams);
            const observableInvoices = this.searchService.searchInvoices(shopID, searchPaymentsParams);
            const observableContracts = this.contractService.getContractsObservable();
            Observable.forkJoin([observablePayments, observableInvoices, observableContracts]).subscribe((response) => {
                const payments = response[0].result;
                const invoices = response[1].result;
                const contracts = response[2].result;
                const registryItems: RegistryItem[] = [];
                _.forEach(payments, (payment: Payment) => {
                    const foundInvoice = _.find(invoices, (invoice: Invoice) => invoice.id === payment.invoiceID);
                    const registryItem = new RegistryItem();
                    registryItem.invoiceID = payment.invoiceID;
                    registryItem.paymentDate = payment.createdAt;
                    registryItem.amount = payment.amount;
                    registryItem.someAmount = 0;
                    registryItem.product = foundInvoice.product;
                    registryItem.description = foundInvoice.description;
                    registryItems.push(registryItem);
                });
                const registry: Registry = new Registry();
                registry.items = registryItems;
                registry.fromTime = fromTime;
                registry.toTime = toTime;

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

    private newSearchPaymentsParams(fromTime: Date, toTime: Date) {
        const searchPaymentsParams = new SearchPaymentsParams();
        searchPaymentsParams.fromTime = fromTime;
        searchPaymentsParams.toTime = toTime;
        searchPaymentsParams.limit = this.limit;
        return searchPaymentsParams;
    }
}
