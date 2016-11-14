import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Shop } from './shop';
import { Urls } from './../../app-config/constants';

@Injectable()
export class ShopService {

    constructor(private http: Http) {}

    handleError(): void {
        debugger;
    }

    getShops(): Promise<Shop[]> {
        return this.http.get(Urls.myparty)
            .toPromise()
            .then(function(response) {
                return response.json().shops as Shop[];
            })
            .catch(this.handleError)

    }
}