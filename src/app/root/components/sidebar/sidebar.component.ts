import { Component } from '@angular/core';

@Component({
    selector: 'kof-sidebar',
    templateUrl: './sidebar.component.pug'
})
export class SidebarComponent {

    public openedSubMenu: string = '';

    public openSubMenu(subMenu: string) {
        this.openedSubMenu = (this.openedSubMenu === subMenu) ? '' : subMenu;
    }

    public closeSubMenu() {
        this.openedSubMenu = '';
    }
}
