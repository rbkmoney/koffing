import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { CapiHttp } from './capi-http.service';
import { ConfigService } from './config.service';

@Injectable()
export class DownloadService {

    constructor(
        private http: CapiHttp,
        private config: ConfigService
    ) { }

    public downloadReport(shopID: string, reportID: number, fileID: string): Observable<any> {
        return this.http.get(`${this.config.capiUrl}/shops/${shopID}/reports/${reportID}/files/${fileID}/download`)
            .map(res => res.json());
    }
}
