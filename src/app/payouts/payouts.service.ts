import { Injectable } from '@angular/core';
import { SearchPayoutsParams } from 'koffing/backend/requests/search-payouts-params';

@Injectable()
export class PayoutsService {
    public toSearchParams(limit: number, offset: number, formValue: any): SearchPayoutsParams {
        const result = new SearchPayoutsParams();
        result.limit = limit;
        result.offset = offset;
        result.fromTime = formValue.from;
        result.toTime = formValue.to;
        result.payoutID = formValue.payoutID;
        result.payoutToolType = ''; // hardcode
        return result;
    }
}
