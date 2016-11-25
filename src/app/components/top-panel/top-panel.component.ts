import { Component } from '@angular/core';

import { KeycloakService } from '../../../keycloak/keycloak.service';

@Component({
    selector: 'kof-top-panel',
    templateUrl: './top-panel.component.pug',
})
export class TopPanelComponent {

    public profileName: string = KeycloakService.getAccountInfo().profileName;

    public logout() {
        KeycloakService.logout();
    }
}
