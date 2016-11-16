import {Http} from '@angular/http';
import {Injectable} from '@angular/core';

@Injectable()
export class ConfigService {

    public capiUrl: string;

    constructor(private http: Http) {
    }

    load() {
        return new Promise(resolve => {
            this.http.get('appConfig.json').map(res => res.json())
                .subscribe(data => {
                    this.capiUrl = data.capiUrl;
                    resolve();
                });
        });
    }
}