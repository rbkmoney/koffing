import {Injectable} from '@angular/core';
import {Http, URLSearchParams} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {ConfigService} from '../../config.service';
import PaymentMethodRequest from './PaymentMethodRequest';

@Injectable()
export class CustomerService {

    constructor(private http: Http, private config: ConfigService) {
    }

    paymentMethod(shopID: string, request: PaymentMethodRequest): Promise<any> {
        const params = new URLSearchParams();
        params.set('fromTime', request.fromTime);
        params.set('toTime', request.toTime);
        params.set('splitUnit', request.splitUnit);
        params.set('splitSize', request.splitSize);
        params.set('paymentMethod', request.paymentMethod);
        return this.http.get(`${this.config.capiUrl}/analytics/shops/${shopID}/customers/stats/payment_method`, {
            search: params
        }).toPromise().then(response => response.json());
    }
}
