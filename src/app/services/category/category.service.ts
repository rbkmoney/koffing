import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Category } from './category';
import { Urls } from './../../app-config/constants';

@Injectable()
export class CategoryService {

    constructor(private http: Http) {}

    handleError(): void {
        debugger;
    }

    getCategories(): Promise<Category[]> {
        return this.http.get(Urls.categories)
            .toPromise()
            .then(
                response => response.json() as Category[]
            )
            .catch(this.handleError)

    }
}