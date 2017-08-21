import { Component } from '@angular/core';

@Component({
    selector: 'kof-sidebar',
    templateUrl: './sidebar.component.pug',
    styles: [`
        .left_col { width: 100%; }
        .menu_section > ul { margin-top: 30px; }
    `]
})
export class SidebarComponent { }
