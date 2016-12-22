import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Category } from './category';
import { ConfigService } from './../../config.service';

@Injectable()
export class CategoryService {

    constructor(
        private http: Http,
        private config: ConfigService
    ) {}

    handleError(): void {
        //debugger;
    }

    getCategories(): Promise<Category[]> {
        return this.http.get(`${this.config.capiUrl}/processing/categories`)
            .toPromise()
            .then(
                response => response.json() as Category[]
            )
            .catch(this.handleError)

    }
}