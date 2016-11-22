import {Component, OnInit} from '@angular/core';
import {KeycloakService} from '../../../keycloak/keycloak.service';

@Component({
    selector: 'tokenization',
    templateUrl: './tokenization.component.pug',
})
export class TokenizationComponent implements OnInit {

    public offlineToken: string;
    public privateToken: string;

    public ngOnInit() {
        this.offlineToken = KeycloakService.getOfflineToken();
        this.privateToken = KeycloakService.getAccountInfo().token;
    }

}
