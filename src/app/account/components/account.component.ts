import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import * as _ from 'lodash';

import { AuthService } from 'koffing/auth/auth.module';

@Component({
    selector: 'kof-account',
    templateUrl: 'account.component.pug',
    styleUrls: ['./account.component.less']
})
export class AccountComponent implements OnInit {

    public accountFrameUrl: SafeResourceUrl;

    constructor(
        private sanitizer: DomSanitizer,
        private route: ActivatedRoute
    ) {}

    public ngOnInit() {
        this.route.params.subscribe((params: Params) => {
            const accountPath = (params['path'] === 'edit') ? '' : params['path'];
            const keycloakUrl = AuthService.getAccountInfo().authUrl;
            const accountFrameUrl = `${_.trimEnd(keycloakUrl, '/')}/realms/external/account/${accountPath}`;
            this.accountFrameUrl = this.sanitizer.bypassSecurityTrustResourceUrl(accountFrameUrl);
        });
    }

}
