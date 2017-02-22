import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { ConfigService } from 'koffing/backend/services/config.service';

@Component({
    selector: 'kof-account',
    templateUrl: 'account.component.pug',
    styleUrls: ['./account.component.less']
})
export class AccountComponent implements OnInit {

    public accountFrameUrl: SafeResourceUrl;

    constructor(
        private configService: ConfigService,
        private sanitizer: DomSanitizer
    ) { }

    public ngOnInit() {
        const accountFrameUrl = `${this.configService.keycloakUrl}/realms/external/account/`;
        this.accountFrameUrl = this.sanitizer.bypassSecurityTrustResourceUrl(accountFrameUrl);
    }

}
