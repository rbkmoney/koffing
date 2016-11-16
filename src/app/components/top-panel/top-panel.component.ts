import {Component} from '@angular/core';
import {KeycloakService} from '../../../keycloak/keycloak.service';

@Component({
    selector: 'top-panel',
    templateUrl: './top-panel.component.pug',
})
export class TopPanelComponent {

    public profileName: string = KeycloakService.auth.profileName;

    public logout: Function = KeycloakService.auth.logout;

}