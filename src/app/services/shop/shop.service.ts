import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Shop} from './shop';
import {Urls} from './../../app-config/constants';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ShopService {

    constructor(private http: Http) {
    }

    getShops(): Promise<Shop[]> {
        return this.http.get(Urls.myparty)
            .toPromise()
            .then(function (response) {
                return response.json().shops as Shop[];
            })
    }
}