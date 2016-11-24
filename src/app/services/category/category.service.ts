import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { ConfigService } from './../../config.service';
import { Category } from './category.class';

@Injectable()
export class CategoryService {

    constructor(private http: Http, private config: ConfigService) { }

    public getCategories(): Promise<Category[]> {
        return this.http.get(`${this.config.capiUrl}/processing/categories`)
            .toPromise()
            .then(response => response.json());
    }
}
