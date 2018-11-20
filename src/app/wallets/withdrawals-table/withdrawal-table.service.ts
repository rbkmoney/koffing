import { Injectable } from '@angular/core';

import { SearchWalletWithdrawals } from 'koffing/backend';

@Injectable()
export class WithdrawalTableService {

    public toSearchParams(limit: number, continuationToken: string, formParams: any): SearchWalletWithdrawals {
        const result = new SearchWalletWithdrawals();
        result.limit = limit;
        result.continuationToken = continuationToken;
        result.walletID = formParams.walletID;
        result.identityID = formParams.identityID;
        result.destinationID = formParams.destinationID;
        result.status = formParams.status;
        result.createdAtFrom = formParams.createdAtFrom;
        result.createdAtTo = formParams.createdAtTo;
        result.amountFrom = formParams.amountFrom;
        result.amountTo = formParams.amountTo;
        result.currencyID = formParams.currencyID;
        return result;
    }
}
