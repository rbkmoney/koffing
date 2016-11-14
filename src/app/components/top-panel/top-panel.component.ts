import { Component } from '@angular/core';

@Component({
    selector: 'top-panel',
    templateUrl: './top-panel.component.pug'
})

export class TopPanelComponent {
    public profileName: string = 'Пользователь';
}